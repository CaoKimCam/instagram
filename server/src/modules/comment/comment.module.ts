import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentController } from "./comment.controller";
import { User } from "../user/user.entity";
import { React } from "../react/react.entity";
import { Comment } from "../comment/comment.entity";
import { Poster } from "../poster/post.entity";
import { CommentService } from "./comment.service";

@Module({
    imports: [TypeOrmModule.forFeature([Poster,User, React, Comment])],
    controllers: [CommentController],
    providers: [CommentService],
})

export class CommentModule{};