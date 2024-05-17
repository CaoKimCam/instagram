import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Poster } from "./post.entity";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { User } from "../user/user.entity";
import { React } from "../React/react.entity";
import { Comment } from "../comment/comment.entity";
import { CommentService } from "../comment/comment.service";
import { ReactService } from "../React/react.service";

@Module({
    imports: [TypeOrmModule.forFeature([Poster, User, React, Comment])],
    controllers: [PostController],
    providers: [PostService, CommentService, ReactService],
})

export class PostModule{};