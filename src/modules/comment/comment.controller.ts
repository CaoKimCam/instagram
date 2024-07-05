import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { CommentService } from "./comment.service";
import { ValidationPipe } from "src/validation.pipe";
import { ApiTags } from "@nestjs/swagger";
import { Comment } from "./comment.entity";
import { CommentDto } from "src/dto/comment.dto";
import { JwtAuthGuard } from "../user/jwt-auth.guard";

@Controller('/comments')
@ApiTags('COMMENTS')
export class CommentController{

    constructor(private readonly cmtService: CommentService){}

    @UseGuards(JwtAuthGuard)
    @Get()//getall
    async getComments(): Promise<any>{
        return await this.cmtService.getComments();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createComment(@Body(new ValidationPipe) cmtDto: CommentDto, @Request() req): Promise<Comment>{
        const id=req.user.id;
        cmtDto.authorId=id;
        return await this.cmtService.createComment(cmtDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async detailComment(@Param ('id') id:ObjectId): Promise<Comment>{
        const id_string= id.toString();
        return await this.cmtService.detailComment(id_string); 
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async updateComment(@Body() cmtDto: CommentDto, @Param('id') id: ObjectId): Promise<Comment>{
        return await this.cmtService.updateComment(cmtDto, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deleteComment(@Param('id') id:ObjectId): Promise<any>{
        return await this.cmtService.deleteComment(id);
    }
}