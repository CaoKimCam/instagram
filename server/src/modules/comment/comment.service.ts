import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";
import { In, Like, MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";import { CommentDto } from "src/dto/comment.dto";
import { User } from "../user/user.entity";
import { Poster } from "../poster/post.entity";
import { React } from "../react/react.entity";
import { ReactService } from "../react/react.service";
import { UserService } from "../user/user.service";

@Injectable()
export class CommentService {

    private readonly logger = new Logger(CommentService.name);
    constructor(

        private readonly reactService: ReactService,
        private readonly userService: UserService,
        @InjectRepository(User)
        private readonly userRepos: MongoRepository<User>,
        @InjectRepository(Comment)
        private readonly cmtRepos: MongoRepository<Comment>,
        @InjectRepository(Poster)
        private readonly postRepos: MongoRepository<Poster>,
        @InjectRepository(React)
        private readonly reactRepos: MongoRepository<React>,

        
    ){}

    async getComments(): Promise<any>{
        // return await this.cmtRepos.find();
        return this.reactService.deleteReact(new ObjectId('666096a3f80422e61dece3ce'))
    }

    //tạo ra 1 comment
    async createComment(commentDto: CommentDto): Promise<Comment>{
        const saveCmt = await this.cmtRepos.save(commentDto);
        //cập nhật lên người dùng đã tạo comment
        const user = await this.userRepos.findOneById(saveCmt.authorId);
            if(!user) return null;
            const newUser =user;
            if (!user.commentIds) newUser.commentIds=[];
            user.commentIds.push(saveCmt.id);
            await this.userRepos.update({id: user.id}, newUser);
            Object.assign(user, newUser);
        //cập nhật lên post
        const post = await this.postRepos.findOneById(saveCmt.postId);
            if (!post) return null;
            const newPost=post;
            if (!newPost.commentIds) newPost.commentIds=[];
            newPost.commentIds.push(saveCmt.id);
            await this.postRepos.update({postId:post.postId},newPost);
            Object.assign(post, newPost);
        //xử lý nếu người comment khác chủ status:
        return saveCmt;
    }

    //lấy thông tin của 1 comment
    async detailComment(commentId:string): Promise<any>{
       return await this.cmtRepos.findOneById(new ObjectId(commentId));
    }

    async updateComment(cmtDto: CommentDto, id: ObjectId): Promise<Comment>{
        const comment = await this.cmtRepos.findOneById(id);
        if (!comment) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        const newCmt =comment;
        newCmt.content=cmtDto.content;
        newCmt.time=cmtDto.time;
        await this.cmtRepos.update({id: id}, newCmt);
        return Object.assign(comment, newCmt);
    }

    async deleteComment(cmtId:ObjectId): Promise<any>{
        const cmt = await this.cmtRepos.findOneById(new ObjectId(cmtId));

        //cập nhật lên post: xoá cmt
        const post= await this.postRepos.findOneById(cmt.postId);
        if (post.commentIds){
            const updateCmtIdsInPost = post.commentIds.filter(
                (id) => !id.equals(new ObjectId(cmtId))
            )
            post.commentIds=updateCmtIdsInPost;
            await this.postRepos.save(post);
        }
        //cập nhật lên likeRepos: xoá likeId của comment
        const user = await this.userRepos.findOneById(cmt.authorId);
        const reactsInComment= cmt.likeId;
        await this.reactRepos.delete({ id: In(reactsInComment) })

        // cập nhật lên user
        // xoá cmt trong list của người cmt
        const updateCmtIds = user.commentIds.filter(
            (id) => !id.equals(new ObjectId(cmtId)),
        );
        this.logger.log(updateCmtIds)
        user.commentIds = updateCmtIds;
        await this.userRepos.save(user);

        const result = await this.cmtRepos.delete({id:new ObjectId(cmtId)});
        return result.affected > 0;
        // return user;
    }
}