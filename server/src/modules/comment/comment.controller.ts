import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { PostDto } from "src/dto/post.dto";
import { CommentService } from "./comment.service";
import { ValidationPipe } from "src/validation.pipe";
import { ApiTags } from "@nestjs/swagger";
import { Comment } from "./comment.entity";
import { CommentDto } from "src/dto/comment.dto";

@Controller('/comments')
@ApiTags('COMMENTS')
export class CommentController{

    constructor(private readonly productService: CommentService){}

    @Get()
    async getComments(): Promise<Comment[]>{
        return await this.productService.getComments();
    }

    @Post()
    async createComment(@Body(new ValidationPipe) cmtDto: CommentDto): Promise<Comment>{
        return await this.productService.createComment(cmtDto);
    }

    @Get('/:id')
    async detailComment(@Param ('id') id:ObjectId): Promise<Comment>{
        const id_string= id.toString();
        return await this.productService.detailComment(id_string); 
    }

    @Put('/:id')
    async updateComment(@Body() productDto: CommentDto, @Param('id') id: ObjectId): Promise<Comment>{
        // const id_string= id.toString();
        return await this.productService.updateComment(productDto, id);
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id:ObjectId): Promise<any>{
        return await this.productService.deleteComment(id);
    }
}