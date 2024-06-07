import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { React } from "./react.entity";
import { Comment } from "../comment/comment.entity";
import { Poster } from "../poster/post.entity";
import { ReactService } from "./react.service";
import { ReactController } from "./react.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Poster,User, React, Comment])],
    controllers: [ReactController],
    providers: [ReactService],
    exports:[ReactService]
})

export class ReactModule{};