import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Poster } from "./post.entity";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { User } from "../user/user.entity";
import { React } from "../react/react.entity";
import { Comment } from "../comment/comment.entity";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CloudinaryProvider } from "../cloudinary/cloudinary";
import { CommentModule } from "../comment/comment.module";
import { ReactModule } from "../react/react.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Poster, User, React, Comment]),
        CommentModule, ReactModule
    ],
    controllers: [PostController],
    providers: [PostService, CloudinaryService, CloudinaryProvider],
    exports:[PostService]
})

export class PostModule{};