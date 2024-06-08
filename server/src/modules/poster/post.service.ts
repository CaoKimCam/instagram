import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Poster } from "./post.entity";
import { In, MongoRepository } from "typeorm";
import { PostDto } from "src/dto/post.dto";
import { ObjectId } from "mongodb";
import { User } from "../user/user.entity";
import { React } from "../react/react.entity";
import { Comment } from "../comment/comment.entity";
import { CommentService } from "../comment/comment.service";
import { ReactService } from "../react/react.service";
@Injectable()
export class PostService {

    private readonly logger = new Logger(PostService.name);
    constructor(
        private readonly cmtService: CommentService,
        private readonly reactService: ReactService,
        @InjectRepository(Poster)
        private readonly postRepos: MongoRepository<Poster>,
        @InjectRepository(User)
        private readonly userRepos: MongoRepository<User>,
        @InjectRepository(React)
        private readonly reactRepos: MongoRepository<React>,
        @InjectRepository(Comment)
        private readonly commentRepos: MongoRepository<Comment>,
    ){}

    async getPosts(): Promise<Poster[]>{
        return await this.postRepos.find();
    }

    //tạo ra 1 bài đăng
    async createPost(postDto: PostDto, postImg: string): Promise<Poster>{
        postDto.postImg=postImg;
        const savePost = await this.postRepos.save(postDto);
        const user = await this.userRepos.findOneById(savePost.authorId);
        if (user){//thêm post vào user
            if (!user.postIds) user.postIds=[];
            const newUser =user;
            newUser.postIds.push(savePost.postId);
            await this.userRepos.update({id: user.id}, newUser);
            Object.assign(user, newUser);
        }
        return savePost;
    }

    //lấy thông tin của 1 bài đăng
    async detailPost(postId:string): Promise<any>{
        const postObjectId= new ObjectId(postId);
        const post = await this.postRepos.findOneById(postObjectId);

        if(!post){throw new NotFoundException(`Post with ID ${postId} not found`);}
        const user= await this.userRepos.findOneById(post.authorId);
        const react= await this.reactRepos.find({
            where: {id: 
                { $in: post.postLikeId}},
        });
        const comment= await this.commentRepos.find({
            where: {
                id: {
                    $in: post.commentIds
                }},
        });
        return {
            post,
            authorName: user.userName,
            avatar: user.userAvatar,
        };
    }

    async updatePost(postDto: PostDto, id: ObjectId): Promise<Poster>{//cho updateImage, content hoặc state
        const toUpdate = await this.postRepos.findOneById(id);
        if (!toUpdate) {throw new NotFoundException(`Post with ID ${id} not found`);}
        this.logger.log(toUpdate);
        await this.postRepos.update({postId: id}, postDto);
        return Object.assign(toUpdate, postDto);
    }

    async deletePost(postId:ObjectId): Promise<boolean>{
        const post = await this.postRepos.findOneById(new ObjectId(postId))

        //1.Xoá postId trong user
        const user = await this.userRepos.findOneById(new ObjectId(post.authorId));
        if (user){//nếu khác null thì mới filter
           if (user.postIds){
                const updatePostIds = user.postIds.filter(
                (id) => !id.equals(new ObjectId(postId)));
                user.postIds = updatePostIds;
                await this.userRepos.save(user);
           }
        } else throw new Error ("Fail to find author of this user!");
        //2. Xoá comment trong post
        const commentIds= await this.commentRepos.findByIds(post.commentIds);
        if (commentIds)
        {
            commentIds.filter(async (comment)=>{
                const cmtId=comment.id;
                this.cmtService.deleteComment(cmtId);
            })
        }
        
        //3. Xoá like trong post
        const likes =await this.reactRepos.findByIds(post.postLikeId);
        if (likes){
            likes.filter(async (like)=>{
                this.reactService.deleteReact(like.id);
        })}

        const result = await this.postRepos.delete({postId:new ObjectId(postId)});
        return result.affected > 0;
    }
    
}