import { IsEmpty, IsNotEmpty, IsOptional} from "class-validator";
import { ObjectId } from "mongodb";

export class CommentDto{
    @IsOptional()
    commentContent?: string;

    @IsOptional()
    time: Date;

    @IsEmpty()
    postId: ObjectId;

    @IsEmpty()
    authorId: ObjectId;
}