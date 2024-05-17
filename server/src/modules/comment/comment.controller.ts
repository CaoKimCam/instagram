import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { PostDto } from "src/dto/post.dto";
import { CommentService } from "./comment.service";
import { ValidationPipe } from "src/validation.pipe";
import { ApiTags } from "@nestjs/swagger";
import { Comment } from "./comment.entity";
import { CommentDto } from "src/dto/comment.dto";

@Controller('posters/comments')
@ApiTags('COMMENTS')
export class CommentController{

    constructor(private readonly productService: CommentService){}
    @Get()
    async getProducts(): Promise<Comment[]>{
        return await this.productService.getComments();
    }


    // @Body(new ValidationPipe)
    @Post()
    async createProduct(@Body(new ValidationPipe) cmtDto: CommentDto): Promise<Comment>{
        return await this.productService.createComment(cmtDto);
    }

    @Get('/:id')
    async detailProduct(@Param ('id') id:ObjectId): Promise<Comment>{
        const id_string= id.toString();
        return await this.productService.detailComment(id_string); 
    }

    @Put('/:id')
    async updateComment(@Body() productDto: CommentDto, @Param('id') id: ObjectId): Promise<Comment>{
        // const id_string= id.toString();
        return await this.productService.updateComment(productDto, id);
    }

    // @Delete('/:id')
    // async deleteProduct(@Param('id') id:ObjectId): Promise<boolean>{
    //     return await this.productService.deleteProduct(id);
    // }
}