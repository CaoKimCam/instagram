import { ApiProperty } from "@nestjs/swagger";
import { IsOptional} from "class-validator";
import { ObjectId } from "mongodb";

export class PostDto{
    @ApiProperty({example: 'content',description: 'The content of the post',})
    @IsOptional()
    postContent?: string;

    @ApiProperty({description: 'The time of the post with type=Date',})
    @IsOptional()
    postTime?:Date;

    @ApiProperty({description: 'The authorId of this post should not be sent by front end!',})
    @IsOptional()
    authorId?: ObjectId;

    @IsOptional()
    postImg?:string;

    @IsOptional()
    state?:number;
}