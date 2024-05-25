import { Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
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
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepos: MongoRepository<User>,
        private jwtService: JwtService,
    ){}

    async signUp(signUpDto: SignUpDto): Promise<{token:string}>{
        const {name, email, password} = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepos.create({
            userName: name,
            userEmail: email,
            userPassword: hashedPassword
        })
        const savedUser = await this.userRepos.save(newUser);
        const token=this.jwtService.sign({ id: savedUser.id });
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
        this.logger.log(newUser);
        return await this.userRepos.save(newUser);
    }

    async detailProduct(id:string): Promise<User>{
        const user=await this.userRepos.findOneById(new ObjectId(id));
        this.logger.log(user.id);
        return user;
    }

    async updateProduct(userDto: UserDto, userId: ObjectId): Promise<User>{
        let toUpdate = await this.userRepos.findOne({where: 
            {id: userId}});
        if (!toUpdate) {
            throw new NotFoundException(`User with ID ${userId} not found`);
            }
        await this.userRepos.update({id: userId}, userDto);
        return Object.assign(toUpdate, userDto);
    }

    async deleteProduct(id:ObjectId): Promise<boolean>{
        const result = await this.userRepos.delete({id:id});
        return result.affected > 0;
    }
}