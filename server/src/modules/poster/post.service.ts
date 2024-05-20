import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Poster } from "./post.entity";
import { In, MongoRepository } from "typeorm";
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
        this.logger.log(user);
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
                    $in: post.commentIds
                }},
        });
        // return await this.postRepos.findOneById(new ObjectId(postId));
        return post;
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

        //1.Xoá postId trong user
        const user = await this.userRepos.findOneById(new ObjectId(post.authorId));
        this.logger.log(user);
        if (user.postIds){//nếu khác null thì mới filter
            const updatePostIds = user.postIds.filter(
            (id) => !id.equals(new ObjectId(postId)));
            user.postIds = updatePostIds;
            await this.userRepos.save(user);
        }
        //2. Xoá comment trong post
        const commentIds= await this.commentRepos.findByIds(post.commentIds);
        if (commentIds)
        {
            commentIds.filter(async (comment)=>{
                const cmtId=comment.id;
                // this.cmtService.deleteComment(comment.id);
                //xoá comment:
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
            })
        }
        
        //3. Xoá like trong post
        const likes =await this.reactRepos.findByIds(post.postLikeId);
        if (likes){
            likes.filter(async (like)=>{
                // this.reactService.deleteReact(like.id);
                // Xoá like:

                const react = this.reactRepos.findOneById(new ObjectId(like.id));
      
                //update user react
                const user = this.userRepos.findOneById(like.author);
                const updateReactInUser = (await user).likeIds.filter(
                    (id) => !id.equals(like.id),
                );
                (await user).likeIds=updateReactInUser;
                this.userRepos.save(await user);
                if (like.type)
                {
                    //unlike trong post
                    const post = this.postRepos.findOneById(like.objectId);
                    const updateReactinPost = (await user).likeIds.filter(
                        (id) => !id.equals(like.id),
                    );
                    (await post).postLikeId=updateReactinPost;
                    this.postRepos.save(await post);
                } else{
                    //unlike trong cmt
                    const cmt = this.commentRepos.findOneById((await react).objectId);
                    const updateReactInCmt = (await cmt).likeId.filter(
                        (id) => !id.equals(like.id),
                    );
                    (await cmt).likeId=updateReactInCmt;
                    this.commentRepos.save(await cmt);
                }
                this.logger.log((await react).time);
                this.reactRepos.delete({id:new ObjectId(like.id)});
                //End: xoá like
        })}

        const result = await this.postRepos.delete({postId:new ObjectId(postId)});
        // this.logger.log(user.postIds);
        return result.affected > 0;
        // return true;
    }
    
}