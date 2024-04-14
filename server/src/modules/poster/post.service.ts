import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Poster } from "./post.entity";
import { MongoRepository } from "typeorm";
import { PostDto } from "src/dto/post.dto";
import { ObjectId } from "mongodb";

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Poster)
        private readonly postRepos: MongoRepository<Poster>,
    ){}

    async getProducts(): Promise<Poster[]>{
        return await this.postRepos.find();
    }

    async createProduct(postDto: PostDto): Promise<Poster>{
        const newPost = new Poster();
        newPost.postContent = postDto.postContent;
        // const product = this.products.create(productDto);
        return await this.postRepos.save(newPost);
    }

    async detailProduct(id:string): Promise<Poster>{
        return await this.postRepos.findOneById(new ObjectId(id));
    }

    async updateProduct(productDto: PostDto, id: ObjectId): Promise<Poster>{
        let toUpdate = await this.postRepos.findOneById(new ObjectId(id));
        await this.postRepos.delete({postId:id})
        let updated = Object.assign(toUpdate, productDto);
        return await this.postRepos.save(updated);
    }

    async deleteProduct(id:ObjectId): Promise<boolean>{
        // const id_string= id.toString();
        const result = await this.postRepos.delete({postId:id});
        return result.affected > 0;
    }
    
}