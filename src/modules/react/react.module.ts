import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { React } from "./react.entity";
import { Comment } from "../comment/comment.entity";
import { Poster } from "../poster/post.entity";
import { ReactService } from "./react.service";
import { ReactController } from "./react.controller";
import { UserModule } from "../user/user.module";
import { CommentModule } from "../comment/comment.module";
import { PostModule } from "../poster/post.module";

@Module({
    imports: [TypeOrmModule.forFeature([Poster,User, React, Comment]),
    forwardRef(()=>UserModule), forwardRef(()=>CommentModule), forwardRef(()=>PostModule)],
    controllers: [ReactController],
    providers: [ReactService],
    exports:[ReactService]
})

export class ReactModule{};