import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { PostDto } from "src/dto/post.dto";
import { Poster } from "./post.entity";
import { PostService } from "./post.service";
import { ValidationPipe } from "src/validation.pipe";
import { ApiTags } from "@nestjs/swagger";

@Controller('/posters')
@ApiTags('POSTERS')
export class PostController{

    constructor(private readonly productService: PostService){}
    @Get()
    async getProducts(): Promise<Poster[]>{
        return await this.productService.getProducts();
    }


    // @Body(new ValidationPipe)
    @Post()
    async createProduct(@Body(new ValidationPipe) postDto: PostDto): Promise<PostDto>{
        return await this.productService.createProduct(postDto);
    }

    @Get('/:id')
    async detailProduct(@Param ('id') id:ObjectId): Promise<Poster>{
        const id_string= id.toString();
        return await this.productService.detailProduct(id_string); 
    }

    @Put('/:id')
    async updateProduct(@Body() productDto: PostDto, @Param('id') id: ObjectId): Promise<Poster>{
        // const id_string= id.toString();
        return await this.productService.updateProduct(productDto, id);
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id:ObjectId): Promise<boolean>{
        return await this.productService.deleteProduct(id);
    }
}