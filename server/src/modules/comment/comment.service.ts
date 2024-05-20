import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";
import { In, Like, MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";import { CommentDto } from "src/dto/comment.dto";
import { User } from "../user/user.entity";
import { Poster } from "../poster/post.entity";
import { React } from "../React/react.entity";

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

    //tạo ra 1 comment
    async createComment(commentDto: CommentDto): Promise<Comment>{
        const newCmt = new Comment();
        newCmt.content = commentDto.content;
        newCmt.authorId= new ObjectId(commentDto.authorId);
        newCmt.time= commentDto.time;
        newCmt.postId=commentDto.postId;
        const saveCmt = await this.commentRepos.save(commentDto);

        //cập nhật lên người dùng
        const user = await this.userRepos.findOneById(saveCmt.authorId);
            const newUser =user;
            if (!user.commentIds) newUser.commentIds=[];
            user.commentIds.push(saveCmt.id);
            await this.userRepos.update({id: user.id}, newUser);
            Object.assign(user, newUser);
        //cập nhật lên post
        const post = await this.postRepos.findOneById(saveCmt.postId);
            const newPost=post;
            if (!newPost.commentIds) newPost.commentIds=[];
            newPost.commentIds.push(saveCmt.id);
            await this.postRepos.update({postId:post.postId},newPost);
            Object.assign(post, newPost);

        return saveCmt;
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
        newCmt.content=cmtDto.content;
        newCmt.time=cmtDto.time;
        await this.commentRepos.update({id: id}, newCmt);
        return Object.assign(comment, newCmt);
    }

    async deleteComment(cmtId:ObjectId): Promise<any>{
        const cmt = await this.commentRepos.findOneById(new ObjectId(cmtId));

        //cập nhật lên post: xoá cmt
        const post= await this.postRepos.findOneById(cmt.postId);
        if (post.commentIds){
            const updateCmtIdsInPost = post.commentIds.filter(
                (id) => !id.equals(new ObjectId(cmtId))
            )
            post.commentIds=updateCmtIdsInPost;
            await this.postRepos.save(post);
        }
        //cập nhật lên likeRepos: xoá likeId
        const user = await this.userRepos.findOneById(cmt.authorId);
        const reactsInComment= cmt.likeId;
        await this.reactRepos.delete({ id: In(reactsInComment) })

        // cập nhật lên user
        // xoá cmt
        const updateCmtIds = user.commentIds.filter(
            (id) => !id.equals(new ObjectId(cmtId)),
        );
        this.logger.log(updateCmtIds)
        user.commentIds = updateCmtIds;
        await this.userRepos.save(user);

        const result = await this.commentRepos.delete({id:new ObjectId(cmtId)});
        return result.affected > 0;
        // return user;
    }
}