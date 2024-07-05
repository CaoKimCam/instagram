import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentController } from "./comment.controller";
import { User } from "../user/user.entity";
import { React } from "../react/react.entity";
import { Comment } from "../comment/comment.entity";
import { Poster } from "../poster/post.entity";
import { CommentService } from "./comment.service";
import { ReactModule } from "../react/react.module";
import { UserModule } from "../user/user.module";
import { PostModule } from "../poster/post.module";

@Module({
    imports: [TypeOrmModule.forFeature([Poster,User, React, Comment]),
    forwardRef(()=>ReactModule), forwardRef(()=>UserModule), forwardRef(()=>PostModule)],
    controllers: [CommentController],
    providers: [CommentService],
    exports:[CommentService]
})

export class CommentModule{};