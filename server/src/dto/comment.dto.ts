import { IsOptional} from "class-validator";
import { ObjectId } from "mongodb";

export class CommentDto{
    @IsOptional()
    content?: string;

    @IsOptional()
    time?: Date;

    // @IsEmpty()
    postId?: ObjectId;

    // @IsEmpty()
    authorId?: ObjectId;
}