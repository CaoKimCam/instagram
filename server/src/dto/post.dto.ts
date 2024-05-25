import { IsEmpty, IsNotEmpty, IsOptional} from "class-validator";
import { ObjectId } from "mongodb";
import { React } from "src/modules/react/react.entity";
import { Comment } from "src/modules/comment/comment.entity";

export class PostDto{
    @IsOptional()
    postContent?: string;

    @IsOptional()
    postImg?: string;

    @IsOptional()
    authorId: ObjectId;
}