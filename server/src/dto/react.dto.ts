import { IsEmpty, IsNotEmpty, IsOptional} from "class-validator";
import { ObjectId } from "mongodb";

export class ReactDto{
    @IsOptional()
    type?:boolean;

    @IsOptional()
    time?:Date;

    @IsOptional()
    author: ObjectId;//người like

    @IsOptional()
    objectId: ObjectId;//đối tượng được like: post hoặc bài viết
}