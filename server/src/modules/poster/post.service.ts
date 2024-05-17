import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Poster } from "./post.entity";
import { MongoRepository } from "typeorm";
import { PostDto } from "src/dto/post.dto";
import { ObjectId } from "mongodb";
import { User } from "../user/user.entity";
import { React } from "../React/react.entity";
import { Comment } from "../comment/comment.entity";
import { CommentService } from "../comment/comment.service";
import { ReactService } from "../React/react.service";

@Injectable()
export class PostService {

    private readonly logger = new Logger(PostService.name);
    constructor(
        @InjectRepository(Poster)
        private readonly postRepos: MongoRepository<Poster>,
        @InjectRepository(User)
        private readonly userRepos: MongoRepository<User>,
        @InjectRepository(React)
        private readonly reactRepos: MongoRepository<React>,
        @InjectRepository(Comment)
        private readonly commentRepos: MongoRepository<Comment>,

        private readonly cmtService: CommentService,
        private readonly reactService: ReactService,
    ){}

    async getProducts(): Promise<Poster[]>{
        return await this.postRepos.find();
    }

    //tạo ra 1 bài đăng
    async createProduct(postDto: PostDto): Promise<Poster>{
        const newPost = new Poster();
        newPost.postContent = postDto.postContent;
        newPost.authorId= new ObjectId(postDto.authorId);
        const savePost = await this.postRepos.save(newPost);
        const user = await this.userRepos.findOneById(savePost.authorId);
        // this.logger.log(user);
        if (user){
            if (!user.postIds) user.postIds=[];
            const newUser =user;
            newUser.postIds.push(savePost.postId);
            await this.userRepos.update({id: user.id}, newUser);
            this.logger.log({id:newUser.id});
            Object.assign(user, newUser);
        }
        return newPost;
    }

    //lấy thông tin của 1 bài đăng
    async detailProduct(postId:string): Promise<any>{
        const postObjectId= new ObjectId(postId);
        const post = await this.postRepos.findOneById(postObjectId);

        if(!post){
            throw new NotFoundException(`Post with ID ${postId} not found`); // Kiểm tra nếu không tìm thấy bài viết
        }

        const user= await this.userRepos.findOneById(post.authorId);

        const react= await this.reactRepos.find({
            where: {id: 
                { $in: post.postLikeId}},
        });
        const comment= await this.commentRepos.find({
            where: {
                id: {
                    $in: post.commentId
                }},
        });
        // return await this.postRepos.findOneById(new ObjectId(postId));
        return{
            post,//trong post sẽ có các trường của post
            user,//trong user sẽ có các thông tin user của post
            react,//trong react sẽ có thông tin về like, authorLike post
            comment,//trong comment có nội dung comment, authorLike comment, timeLikecomment
        }
    }

    async updateProduct(productDto: PostDto, id: ObjectId): Promise<Poster>{//cho updateImage, content hoặc state
        const toUpdate = await this.postRepos.findOneById(id);
        this.logger.log(toUpdate);
        if (!toUpdate) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        this.logger.log(toUpdate);
        await this.postRepos.update({postId: id}, productDto);
        return Object.assign(toUpdate, productDto);
    }

    async deleteProduct(postId:ObjectId): Promise<boolean>{
        const post = await this.postRepos.findOneById(new ObjectId(postId))
        
        //xoá postId trong user
        const user = await this.userRepos.findOneById(post.authorId);
        if (user.postIds){//nếu khác null thì mới filter
            const updatePostIds = user.postIds.filter(
            (id) => !id.equals(new ObjectId(postId)));
            user.postIds = updatePostIds;
            await this.userRepos.save(user);
        }

        // Xoá comment trong post
        const commentIds= await this.commentRepos.findByIds(post.commentId);
        if (commentIds)
        {
            commentIds.filter((comment)=>{
                this.cmtService.deleteComment(comment.id);
            })
        }
        
        //xoá like trong post
        const likes =await this.reactRepos.findByIds(post.postLikeId);
        likes.filter((like)=>{
            this.reactService.deleteReact(like.id);
        })

        const result = await this.postRepos.delete({postId:new ObjectId(postId)});
        // this.logger.log(user.postIds);
        return result.affected > 0;
        // return true;
    }
    
}