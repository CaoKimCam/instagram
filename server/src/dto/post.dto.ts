import { IsOptional} from "class-validator";
import { ObjectId } from "mongodb";

export class PostDto{
    @IsOptional()
    postContent?: string;

    @IsOptional()
    postTime?:Date;

    @IsOptional()
    authorId: ObjectId;
}