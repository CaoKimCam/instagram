import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Poster } from "./post.entity";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { User } from "../user/user.entity";
import { React } from "../react/react.entity";
import { Comment } from "../comment/comment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Poster, User, React, Comment])],
    controllers: [PostController],
    providers: [PostService],
})

export class PostModule{};