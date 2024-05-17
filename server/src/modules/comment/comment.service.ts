import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";
import { Like, MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";import { CommentDto } from "src/dto/comment.dto";
import { User } from "../user/user.entity";
import { Poster } from "../poster/post.entity";
import { React } from "../React/react.entity";
;

@Injectable()
export class CommentService {

    private readonly logger = new Logger(CommentService.name);
    constructor(
        @InjectRepository(User)
        private readonly userRepos: MongoRepository<User>,
        @InjectRepository(Comment)
        private readonly commentRepos: MongoRepository<Comment>,
        @InjectRepository(Poster)
        private readonly postRepos: MongoRepository<Poster>,
        @InjectRepository(React)
        private readonly reactRepos: MongoRepository<React>,
    ){}

    async getComments(): Promise<Comment[]>{
        return await this.commentRepos.find();
    }

    //tạo ra 1 bài comment
    async createComment(commentDto: CommentDto): Promise<Comment>{
        const newCmt = new Comment();
        newCmt.content = commentDto.commentContent;
        newCmt.author= new ObjectId(commentDto.authorId);
        newCmt.commentTime= commentDto.time;
        const saveCmt = await this.commentRepos.save(newCmt);

        //cập nhật lên người dùng
        const user = await this.userRepos.findOneById(saveCmt.author);
            const newUser =user;
            if (!user.commentIds) newUser.commentIds=[];
            user.commentIds.push(saveCmt.id);
            await this.userRepos.update({id: user.id}, newUser);
            Object.assign(user, newUser);
        //cập nhật lên post
        const post = await this.postRepos.findOneById(commentDto.postId);
            const newPost=post;
            if (!newPost.commentId) newPost.commentId=[];
            newPost.commentId.push(saveCmt.id);
            await this.postRepos.update({postId:commentDto.postId},newPost)
            Object.assign(post, newPost);
        return newCmt;
    }

    //lấy thông tin của 1 bài đăng
    async detailComment(commentId:string): Promise<any>{
        const cmtObjectId= new ObjectId(commentId);
        const cmt = await this.commentRepos.findOneById(cmtObjectId);
        return cmt;
    }

    async updateComment(cmtDto: CommentDto, id: ObjectId): Promise<Comment>{
        const comment = await this.commentRepos.findOneById(id);

        if (!comment) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        const newCmt =comment;
        newCmt.content=cmtDto.commentContent;
        newCmt.commentTime=cmtDto.time;
        await this.commentRepos.update({id: id}, newCmt);
        return Object.assign(comment, newCmt);
    }

    async deleteComment(cmtId:ObjectId): Promise<boolean>{
        // const id_string= id.toString();
        const cmt = await this.commentRepos.findOne({
            where: { cmt: cmtId },
          });

        //cập nhật lên post: xoá cmt
        const post= await this.postRepos.findOneById(cmt.postId);
        const updateCmtIdsInPost = post.commentId.filter(
            (id) => !id.equals(cmtId)
        )
        post.commentId=updateCmtIdsInPost;
        await this.postRepos.save(post);

        //cập nhật lên likeId: xoá likeId
        var likes=await this.reactRepos.findByIds(cmt.likeId);
        const updateCmtIdsInLike = likes.filter(
            (like) =>{
                this.reactRepos.delete({id: like.id});
            }
        )
        likes=updateCmtIdsInLike;
        await this.reactRepos.save(likes);

        //cập nhật lên user
        //xoá cmt
        const user = await this.userRepos.findOneById(cmt.author);
        const updateCmtIds = user.commentIds.filter(
            (id) => !id.equals(cmtId),
        );
        user.postIds = updateCmtIds;

        //xoá like
        const updateDelLike=user.likeIds.filter(
            (likeId)=>{
                !likeId.equals(likeId)
            }
        )
        user.likeIds=updateDelLike;
        await this.userRepos.save(user);

        const result = await this.commentRepos.delete({id:cmtId});
        return result.affected > 0;
    }
    
}