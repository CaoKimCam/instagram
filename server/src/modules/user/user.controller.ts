import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
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
import { FollowService } from "./follow.service";

@Controller('users')
@ApiTags('USERS')
export class UserController{
    constructor(
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService,
        private readonly flService: FollowService
    ){}

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
    @Get('/:id')
    async detailFriend(@Param('id') id:string): Promise<User>{
        return await this.userService.detailAccount(id); 
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
    @Delete('/account')
    async deleteAccount(@Request() req): Promise<any>{
        const user=req.user;
        const id=user.id;
        return await this.userService.deleteAccount(new ObjectId(id));
    }

    //tính năng liên quan đến follow
    @UseGuards(JwtAuthGuard)
    @Post('/followed/:followerId')//accept theo dõi của người theo dõi
    async acceptFollow(@Request() req, @Param('followerId') followerId: string){
        const followingId= new ObjectId(req.user.id);
        return this.flService.acceptFollow(new ObjectId(followerId), followingId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/followeing/:followingId')//xoá theo dõi khi đã là accept bởi người theo dõi
    async unfollowByFollower(@Request() req, @Param('followingId') followingId: string){
        const followerId= new ObjectId(req.user.id);
        return this.flService.unfollowUser(followerId, new ObjectId(followingId));
    }

    //xoá theo dõi bởi người được theo dõi
    @UseGuards(JwtAuthGuard)
    @Delete('/follower/:followedId')//xoá theo dõi khi đã là accept bởi người được theo dõi
    async unfollowByFollowing(@Request() req, @Param('followedId') followedId: string){
        const followingId= new ObjectId(req.user.id);
        return this.flService.unfollowUser(new ObjectId(followedId), followingId);
    }

    //---bestfriend
        //addtobestfriend
    @UseGuards(JwtAuthGuard)
    @Post('/bff/:name')//thêm
    async addBestfriend(@Request() req, @Param('name') name: string){
        const current= new ObjectId(req.user.id);
        return this.flService.addBestFriend(current, name)
    }
        //remove to bff
    @UseGuards(JwtAuthGuard)
    @Delete('/bff/:name')//xoá
    async removeBestfriend(@Request() req, @Param('name') name: string){
        const current= new ObjectId(req.user.id);
        return this.flService.removeBestFriend(current, name)
    }
        //check trạng thái friend
    @UseGuards(JwtAuthGuard)
    @Post('/friend/:name')
    async isFriend(@Request() req, @Param('name') name: string){
        const current= new ObjectId(req.user.id);
        return this.flService.isFriend(current, name)
    }

    //---search
    @Get('/search/:name')
    async searchListUserByName(@Param('name') name: string){
        return this.userService.searchByName(name)
    }

}