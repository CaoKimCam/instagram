import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { PostDto } from "src/dto/post.dto";
import { Poster } from "./post.entity";
import { PostService } from "./post.service";
import { ValidationPipe } from "src/validation.pipe";
import { ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadedFile } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { JwtAuthGuard } from "../user/jwt-auth.guard";

@Controller('/posters')
@ApiTags('POSTERS')
export class PostController{
    private readonly logger= new Logger(PostController.name);
    constructor(
        private readonly productService: PostService,
        private readonly cloudinaryService: CloudinaryService,
        ){}
        
    @UseGuards(JwtAuthGuard)
    @Get('/allposts')
    async getAllPosts(@Request() req): Promise<Poster[]>{
        const id=req.user.id;
        return await this.productService.getAllPosts(id);
    }
        
    @UseGuards(JwtAuthGuard)
    @Get('/myposts')
    async getPosts(@Request() req): Promise<Poster[]>{
        const id=req.user.id;
        return await this.productService.getPosts(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createProduct(@UploadedFile() file: Express.Multer.File, @Body(new ValidationPipe) postDto: PostDto, @Request() req): Promise<any>{
        postDto.authorId=req.user.id;
        const postImg= (await this.cloudinaryService.uploadFile(file)).secure_url;
        return await this.productService.createPost(postDto, postImg);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/myposts/:id')
    async detailProduct(@Param ('id') id:ObjectId): Promise<Poster>{
        const id_string= id.toString();
        return await this.productService.detailPost(id_string); 
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async updateProduct(@Body() postDto: PostDto, @Param('id') id: ObjectId, @Request() req): Promise<Poster>{
        postDto.authorId=req.user.id;
        return await this.productService.updatePost(postDto, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deleteProduct(@Param('id') id:ObjectId): Promise<boolean>{
        return await this.productService.deletePost(id);
    }
}