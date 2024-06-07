import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Poster } from "./post.entity";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { User } from "../user/user.entity";
import { React } from "../react/react.entity";
import { Comment } from "../comment/comment.entity";
import { MulterModule } from "@nestjs/platform-express";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { CloudinaryProvider } from "../cloudinary/cloudinary";

@Module({
    imports: [
        TypeOrmModule.forFeature([Poster, User, React, Comment]),
    ],
    controllers: [PostController],
    providers: [PostService, CloudinaryService, CloudinaryProvider],
    exports:[PostService]
})

export class PostModule{};