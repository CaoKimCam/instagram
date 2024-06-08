import { Inject, Injectable, Logger, NotFoundException, UnauthorizedException, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { MongoRepository } from "typeorm";
import { UserDto } from "src/dto/user.dto";
import { ObjectId } from "mongodb";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "src/dto/user/signup.dto";
import { LoginDto } from "src/dto/user/login.dto";
import * as bcrypt from 'bcrypt';
import { CommentService } from "../comment/comment.service";
import { ReactService } from "../react/react.service";
import { PostService } from "../poster/post.service";

@Injectable()
export class UserService{
    private readonly logger = new Logger(UserService.name);
    constructor(
        @Inject(forwardRef(() => CommentService))
        private readonly cmtService: CommentService,
        @Inject(forwardRef(() => ReactService))
        private readonly reactService: ReactService,
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService,
        @InjectRepository(User)
        private readonly userRepos: MongoRepository<User>,
        private jwtService: JwtService,
    ){}

    async signUp(signUpDto: SignUpDto): Promise<{token:string}>{
        const {name, email, password} = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        if (await this.isUsernameTaken(signUpDto.name)===true) throw new Error ("Username is already taken!!");
        if (await this.isEmailTaken(signUpDto.email)===true) throw new Error ("Email is already taken!!");
        const newUser = this.userRepos.create({
            userName: name,
            userEmail: email,
            userPassword: hashedPassword})
        const savedUser = await this.userRepos.save(newUser);
        const token=this.jwtService.sign({ id: savedUser.id });
        return {token};
    }

    async login(loginDto: LoginDto): Promise<{token:string}>{
        const {email, password}= loginDto;
        const user = await this.userRepos.findOne({where:{userEmail: email}});
        if (!user){throw new UnauthorizedException('Invalid user or email');}
        const isPasswordMatched = await bcrypt.compare(password, user.userPassword);
        if (!isPasswordMatched){throw new UnauthorizedException('Invalid email or password');}
        const token= this.jwtService.sign({id: user.id});
        await this.userRepos.save(user);
        return {token};
    }

    async getAllUsers(): Promise<User[]>{return await this.userRepos.find();}

    async detailAccount(id:string): Promise<User>{
        const user=await this.userRepos.findOneById(new ObjectId(id));
        return user;
    }

    async updateAccount(userDto: UserDto, userId: ObjectId, avatar: string): Promise<User>{
        const user = await this.userRepos.findOne({where:{id: userId}});
        if (!user) {throw new NotFoundException(`User with ID ${userId} not found`);}
        const newUser= user;
        if (userDto.userName){
            if (this.isUsernameTaken(userDto.userName)) throw new Error('Username is already taken!');
            else newUser.userName=userDto.userName;
        }
        if (avatar) newUser.userAvatar=avatar;
        if (userDto.userBio) newUser.userBio=userDto.userBio;
        await this.userRepos.update({id: userId}, newUser);
        return Object.assign(user, newUser);
    }//cập nhật một trong các tt: tiểu sửl username, avatar

    async deleteAccount(id:ObjectId): Promise<boolean>{
        const user = this.userRepos.findOneById(new ObjectId(id));
        if ((await user).likeIds){
            (await user).likeIds.filter((likeId)=>{
                this.reactService.deleteReact(likeId)
            })
        }
        if ((await user).commentIds){
            (await user).commentIds.filter((cmtId)=>{
                this.cmtService.deleteComment(cmtId)
            })
        }
        if ((await user).postIds){
            (await user).postIds.filter((postId)=>{
                this.postService.deletePost(postId)
            })
        }
        const result = await this.userRepos.delete({id:id});
        return result.affected > 0;
    }

    
    // hàm phụ
    async isUsernameTaken(username: string): Promise<boolean>{
        const existingUser = await this.userRepos.findOne({where:{userName:username.trim().toString()}})
        return !!existingUser;
    }
    async isEmailTaken(email: string): Promise<boolean>{
        const existingEmail = await this.userRepos.findOne({where:{userEmail:email}})
        return !!existingEmail;
    }
}