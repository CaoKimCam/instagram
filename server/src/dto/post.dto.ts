import { IsNotEmpty} from "class-validator";

export class PostDto{
    @IsNotEmpty()
    postContent?: string;
}