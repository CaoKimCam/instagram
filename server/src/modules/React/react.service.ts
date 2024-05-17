import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";
import { User } from "../user/user.entity";
import { Poster } from "../poster/post.entity";
import { React } from "./react.entity";
import { ReactDto } from "src/dto/react.dto";
import { Comment } from "../comment/comment.entity";
;

@Injectable()
export class ReactService {

    private readonly logger = new Logger(ReactService.name);
    constructor(
        @InjectRepository(User)
        private readonly userRepos: MongoRepository<User>,
        @InjectRepository(Comment)
        private readonly commentRepos: MongoRepository<Comment>,
        @InjectRepository(Poster)
        private readonly postRepos: MongoRepository<Poster>,
        @InjectRepository(React)
        private readonly reactRepos: MongoRepository<React>
    ){}

    async getReacts(): Promise<React[]>{
        return await this.reactRepos.find();
    }

    //like
    async createReacts(reactDto: ReactDto): Promise<any>{//React
        const newReact = new React();
        if(reactDto.authorId)newReact.author=new ObjectId(reactDto.authorId);
        if(reactDto.objectId)newReact.objectId=new ObjectId(reactDto.objectId);
        if(reactDto.time)newReact.time=reactDto.time;
        if(reactDto.type)newReact.type=reactDto.type;
        const saveReact = await this.reactRepos.save(newReact);

        //cập nhật lượt like của người dùng
        const user = await this.userRepos.findOneById(new ObjectId(saveReact.author));
            const newUser =user;
            if (!user.likeIds) newUser.likeIds=[];
            user.likeIds.push(saveReact.id);
            await this.userRepos.update({id: user.id}, newUser);
            const saveUser= Object.assign(user, newUser);
        
        if (!reactDto.type){
        //cập nhật lên comment
            const comment = await this.commentRepos.findOneById(new ObjectId(reactDto.objectId));
                if (comment){
                    const newCmt= comment;
                    if(!newCmt.likeId) newCmt.likeId=[];
                    newCmt.likeId.push(saveReact.id);
                    await this.commentRepos.update({id: saveReact.objectId},newCmt);
                    var saveCmt =Object.assign(comment, newCmt);
                    }
            this.logger.log("comment");
        }
        else{
        //cập nhật lên bài đăng
            const post = await this.postRepos.findOneById(new ObjectId(reactDto.objectId));
            if (post){
                const newPost = post;
                if(!newPost.postLikeId) newPost.postLikeId=[];
                newPost.postLikeId.push(saveReact.id);
                await this.postRepos.update({postId:saveReact.objectId},newPost);
                var savePost = Object.assign(post, newPost);   
            }
            this.logger.log("post");
        }

        return {
            saveReact,
            saveUser,
            saveCmt,
            savePost
        };
    }

    //lấy thông tin của 1 bài đăng
    async detailReacts(reactId:string): Promise<any>{
        const reactObjectId= new ObjectId(reactId);
        const react = await this.reactRepos.findOneById(reactObjectId);

        if(!react){
            throw new NotFoundException(`Post with ID ${reactId} not found`); // Kiểm tra nếu không tìm thấy bài viết
        }
        return{
            react
        }
    }

    // async updateReact(reactDto: ReactDto, id: ObjectId): Promise<React>{
    //     const react = await this.reactRepos.findOneById(id);
    //     if (!react) {
    //         throw new NotFoundException(`Post with ID ${id} not found`);
    //         }
    //     const newReact=react;
    //     newReact.time=reactDto.time;
    //     newReact.type=reactDto.type;
    //     await this.reactRepos.update({id:react.id},newReact);
    //     const saveReact =Object.assign(react, newReact);
    //     //cập nhật lượt like của người dùng
    //     const user = await this.userRepos.findOneById(saveReact.author);
    //         const newUser =user;
    //         if (!user.likeIds) newUser.likeIds=[];
    //         user.likeIds.push(saveReact.id);
    //         await this.userRepos.update({id: user.id}, newUser);
    //         Object.assign(user, newUser);
        
    //     if (!reactDto.type){

    //     //cập nhật lên comment
    //         const comment = await this.commentRepos.findOneById(reactDto.objectId);
    //             const newCmt= comment;
    //             if(!newCmt.likeId) newCmt.likeId=[];
    //             newCmt.likeId.push(saveReact.id);
    //             await this.commentRepos.update({id: saveReact.objectId},newCmt);
    //             Object.assign(comment, newCmt);

    //             // const post = await this.postRepos.findOneById(newCmt.postId);
    //             // const newPost = post;
    //             // if(!newPost.cmtLikeId) newPost.cmtLikeId=[];
    //             // newPost.cmtLikeId.push(saveReact.id);
    //             // await this.postRepos.update({postId:newCmt.postId},newPost);
    //             // Object.assign(post, newPost);
            
    //     } else{

    //     //cập nhật lên bài đăng
    //         const post = await this.postRepos.findOneById(reactDto.objectId);
    //             const newPost = post;
    //             if(!newPost.postLikeId) newPost.postLikeId=[];
    //             newPost.postLikeId.push(saveReact.id);
    //             await this.postRepos.update({postId:saveReact.objectId},newPost);
    //             Object.assign(post, newPost);
    //     }
    //     return saveReact;
    // }

    async deleteReact(reactId:ObjectId): Promise<boolean>{
        // const id_string= id.toString();
        const react = await this.reactRepos.findOneById(new ObjectId(reactId));
      
        //update user react
        const user = await this.userRepos.findOneById(react.author);
        const updateReactInUser = user.likeIds.filter(
            (id) => !id.equals(react.id),
        );
        user.likeIds=updateReactInUser;
        await this.userRepos.save(user);
        if (react.type)
        {
            //unlike trong post
            const post = await this.postRepos.findOneById(react.objectId);
            const updateReactinPost = user.likeIds.filter(
                (id) => !id.equals(react.id),
            );
            post.postLikeId=updateReactinPost;
            await this.postRepos.save(post);
        } else{
            //unlike trong user trong cmt
            const cmt = await this.commentRepos.findOneById(react.objectId);
            const updateReactInCmt = cmt.likeId.filter(
                (id) => !id.equals(react.id),
            );
            cmt.likeId=updateReactInCmt;
            await this.commentRepos.save(cmt);
        }
        this.logger.log(react.time);
        const result = await this.reactRepos.delete({id:new ObjectId(reactId)});
        return result.affected > 0;
    }
    
}