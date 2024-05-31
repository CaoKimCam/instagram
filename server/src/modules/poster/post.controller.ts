import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from "@nestjs/common";
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

@Controller('/posters')
@ApiTags('POSTERS')
export class PostController{
    private readonly logger= new Logger(PostController.name);

    constructor(
        private readonly productService: PostService,
        private readonly cloudinaryService: CloudinaryService,
        ){}
    @Get()
    async getProducts(): Promise<Poster[]>{
        return await this.productService.getProducts();
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createProduct(@UploadedFile() file: Express.Multer.File, @Body(new ValidationPipe) postDto: PostDto): Promise<any>{
        // const imageUrl=file? `/uploads/${file.originalname}`:'';
        // return await this.productService.createProduct(postDto, file.buffer, file.mimetype);
        const imageUrl= (await this.cloudinaryService.uploadFile(file)).secure_url;
        return await this.productService.createProduct(postDto, imageUrl);
    }

    @Get('/:id')
    async detailProduct(@Param ('id') id:ObjectId): Promise<Poster>{
        const id_string= id.toString();
        return await this.productService.detailProduct(id_string); 
    }

    @Put('/:id')
    async updateProduct(@Body() productDto: PostDto, @Param('id') id: ObjectId): Promise<Poster>{
        return await this.productService.updateProduct(productDto, id);
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id:ObjectId): Promise<boolean>{
        return await this.productService.deleteProduct(id);
    }
}