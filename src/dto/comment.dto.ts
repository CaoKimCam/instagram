import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional} from "class-validator";
import { ObjectId } from "mongodb";

export class CommentDto{
    @ApiProperty({example: 'content',description: 'The content of this comment',})
    @IsOptional()
    content?: string;

    @ApiProperty({description: 'The date of this comment with type=Date',})
    @IsOptional()
    time?: Date;

    @ApiProperty({description: 'The postId of this comment',})
    // @IsNotEmpty()
    postId?: ObjectId;

    // @IsNotEmpty()
    @ApiProperty({description: 'The author of this comment',})
    authorId?: ObjectId;//không gửi lên: tự động lấy từ token
}