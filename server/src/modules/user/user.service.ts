import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { MongoRepository } from "typeorm";
import { UserDto } from "src/dto/user.dto";
import { ObjectId } from "mongodb";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "src/dto/user/signup.dto";
import { LoginDto } from "src/dto/user/login.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepos: MongoRepository<User>,
        private jwtService: JwtService,
    ){}

    async signUp(signUpDto: SignUpDto): Promise<{token:string}>{
        const {name, email, password} = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        // const newUser = new User();
        // newUser.userName=name;
        // newUser.userEmail=email;
        // newUser.userPassword=hashedPassword;
        // this.userRepos.save(newUser);
        const newUser = this.userRepos.create({
            userName: name,
            userEmail: email,
            userPassword: hashedPassword
        })
        const savedUser = await this.userRepos.save(newUser);
        const token=this.jwtService.sign({id: savedUser.id});
        return {token};
    }

    async login(loginDto: LoginDto): Promise<{token:string}>{
        const {email, password}= loginDto;
        const user = await this.userRepos.findOne({
            where:{userEmail: email}
        });

        if (!user){
            throw new UnauthorizedException('Invalid user or email');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.userPassword);

        if (!isPasswordMatched){
            throw new UnauthorizedException('Invalid email or password');
        }
        const token= this.jwtService.sign({id: user.id});
        await this.userRepos.save(user);
        return {token};
    }

    async getAllUsers(): Promise<User[]>{
        return await this.userRepos.find();
    }

    async createProduct(userDto: UserDto): Promise<User>{
        const newUser = new User();
        newUser.userName = userDto.userName;
        newUser.userBio=userDto.userBio;
        // const product = this.products.create(productDto);
        return await this.userRepos.save(newUser);
    }

    async detailProduct(id:string): Promise<User>{
        return await this.userRepos.findOneById(new ObjectId(id));
    }

    async updateProduct(productDto: UserDto, id: ObjectId): Promise<User>{
        let toUpdate = await this.userRepos.findOneById(new ObjectId(id));
        await this.userRepos.update(toUpdate, productDto);
        return Object.assign(toUpdate, productDto);
    }

    async deleteProduct(id:ObjectId): Promise<boolean>{
        // const id_string= id.toString();
        const result = await this.userRepos.delete({id:id});
        return result.affected > 0;
    }


}