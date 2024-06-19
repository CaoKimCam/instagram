import { Inject, Injectable, Logger, NotFoundException, forwardRef } from "@nestjs/common";
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
        @Inject(forwardRef(() => CommentService))
        private readonly cmtService: CommentService,
        @Inject(forwardRef(() => ReactService))
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

    // async getAllPosts(): Promise<Poster[]>{
    //     return await this.postRepos.find();
    // }

    async getAllPosts(usesId: string):Promise<any[]>{
        
        const currentUser=await this.userRepos.findOneById(usesId)
        // const followings = currentUser.followings;
        // const followers = currentUser.followers;
        var friendIds;
        var friends;
        var onlyFollowings;
        var posts;
        if (currentUser.followers&&currentUser.followings)
        {
            friendIds=currentUser.followers.filter(id=>{
                currentUser.followings.includes(id)
            })
        }
        if(friendIds)friends=this.userRepos.findByIds(friendIds);
        if(currentUser.followings) onlyFollowings= currentUser.followings.filter(id=>{
            return !friendIds.includes(id)
        })
        if(friendIds) {
            var postfromFriends=friendIds.map(async friendId=>
                {
                const name = (await this.userRepos.findOneById(new ObjectId(friendId))).userName
                return (!this.isBestFriend(currentUser.id.toString(),friendId.toString()))? 
                this.getFriendPosts(name)
                : this.getBestFriendPosts(name)
                })
        }

        if(onlyFollowings){
            var postfromFollowings=onlyFollowings.map(async followingId=>{
                const name = (await this.userRepos.findOneById(new ObjectId(followingId))).userName
                this.logger.log("hi", await this.getFollowPost(name))
                return await this.getFollowPost(name);
            })
        }

        // Đợi cho tất cả các Promise được giải quyết
        const resolvedPostsFromFriends = postfromFriends ? await Promise.all(postfromFriends) : [];
        const resolvedPostsFromFollowings = postfromFollowings ? await Promise.all(postfromFollowings) : [];
        
        posts=resolvedPostsFromFriends.concat(resolvedPostsFromFollowings)
        return posts.length>0?posts:null;
    }
    async getPosts(id:string): Promise<Poster[]>{
        const user = await this.userRepos.findOneById(new ObjectId(id));
        const postIds=user.postIds;
        const posts=await this.postRepos.findByIds(postIds);
        return posts;
    }

    async getPublicPosts(name: string): Promise<any>{
        const user = await this.userRepos.findOne({where:{userName: name}})
        var publicPosts= await this.postRepos.findByIds(user.postIds)
        publicPosts=publicPosts.filter(post=>{
            if(post.state===0) return post
        })
        return publicPosts;
    }

    async getFollowPost(name: string): Promise<any>{
        const user = await this.userRepos.findOne({where:{userName: name}})
        var followingPosts= await this.postRepos.findByIds(user.postIds)
        followingPosts=followingPosts.filter(post=>{
            if(post.state===1) return post
        })
        return followingPosts;
    }

    async getFriendPosts(name: string): Promise<any>{
        const user = await this.userRepos.findOne({where:{userName: name}})
        // const publicPosts= await this.postRepos.find({where:{
        //     postId: In(user.postIds),
        //     state:2
        // }})
        var friendPosts= await this.postRepos.findByIds(user.postIds)
        friendPosts=friendPosts.filter(post=>{
            if(post.state===2) return post
        })
        return friendPosts;
    }

    async getBestFriendPosts(name: string): Promise<any>{
        const user = await this.userRepos.findOne({where:{userName: name}})
        var bfriendPosts= await this.postRepos.findByIds(user.postIds)
        bfriendPosts=bfriendPosts.filter(post=>{
            if(post.state===3) return post
        })
        return bfriendPosts;
    }

    async getPrivatePosts(name: string): Promise<any>{
        const user = await this.userRepos.findOne({where:{userName: name}})
        const publicPosts= await this.postRepos.find({where:{
            postId: {$in: user.postIds},
            state:4,
        },
        order:{
            postTime:'DESC'
        },
        }
        )
        return publicPosts.length>0?publicPosts[0]:null;
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
    //hàm phụ:
    async isBestFriend(current: string, other: string): Promise<Boolean>{
        const currentId= new ObjectId(current);
        const friendId= new ObjectId(other);
        const friend= await this.userRepos.findOneById(friendId);
        return friend.bestfriend.includes(currentId)
    }   
}