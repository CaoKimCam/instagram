import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { ValidationPipe } from "src/validation.pipe";
import { UserDto } from "src/dto/user.dto";
import { ObjectId } from "mongodb";
import { SignUpDto } from "src/dto/user/signup.dto";
import { LoginDto } from "src/dto/user/login.dto";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Controller('users')
@ApiTags('USERS')
export class UserController{
    constructor(
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Post('/test')
    async get(@Request() req):Promise<any>{
        const user = req.user;
        return await user;
    }

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto){
        return await this.userService.signUp(signUpDto);
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<{token: string}>{
        return this.userService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    async getUsers(@Request() req): Promise<any>{
        const user =req.user;
        if (user.id==='123ac')
        return await this.userService.getAllUsers();
        else return new ResponseData([], HttpStatus.ERROR, HttpMessage.FORBIDDEN);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/account')
    async detailAccount(@Request() req): Promise<User>{
        const user=req.user;
        const id_string=user.id.toString();
        return await this.userService.detailAccount(id_string); 
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @UseInterceptors(FileInterceptor('avatar'))
    async updateAccount(@Body() userDto: UserDto, @Request() req, @UploadedFile() avatar: Express.Multer.File): Promise<User>{
        let avatarUrl;
        if (avatar) {
            avatarUrl = (await (this.cloudinaryService.uploadFile(avatar))).secure_url;
        }
        const id=req.user.id;
        return await this.userService.updateAccount(userDto, id, avatarUrl);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteAccount(@Request() req): Promise<any>{
        const user=req.user;
        const id=user.id;
        return await this.userService.deleteAccount(new ObjectId(id));
    }
}