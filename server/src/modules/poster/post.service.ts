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

    async TEST(userid: string): Promise<any[]>{
        const id= new ObjectId(userid)
        const posts = await this.postRepos.find();
        const fullposts = await Promise.all(
            posts.map(async post=>{
                const reactIds= post.postLikeId;
                const reacts= await this.reactRepos.findByIds(reactIds)
                const listObjectIdsLike= reacts.map(react=>react.author)
                const numberUserLikePost= reacts.length
                const isCurrentUserLikePost= (reactIds.includes(id))
                const users= await this.userRepos.findByIds(listObjectIdsLike)
                const userNamesLikePost=users.map(user=> user.userName)
                return{
                    ...post,
                    userNameLikePosts: userNamesLikePost,
                    countReacts: numberUserLikePost,
                    isLike: isCurrentUserLikePost,
                }
            })
        )
        return fullposts;
    }
    async getPostFromOtherByUserName(currentId:ObjectId, name: string): Promise<any>{
        const other = await this.userRepos.findOne({
            where: {userName: name}
        })
        const publicPosts= await this.getPublicPosts(name)
        const followingPosts= await this.getFollowPost(name)
        var bestfriendPosts
        var friendPosts
        if (other.bestfriend.includes(currentId)) bestfriendPosts=this.getBestFriendPosts(name)
        if (this.isFriend(currentId.toString(), other.id.toString())) friendPosts=this.getFriendPosts(name)
        var posts=[]
        if (publicPosts && publicPosts.length>0)posts=publicPosts
        if (followingPosts && followingPosts.length>0)posts=posts.concat(followingPosts)
        if (bestfriendPosts && bestfriendPosts.length>0) posts=posts.concat(bestfriendPosts)
        if (friendPosts&& friendPosts.length>0) posts=posts.concat(friendPosts)
        posts.sort((a,b)=>b.postTime-a.postTime)
        // if (posts){
            const fullposts = await Promise.all( 
                posts.map(async post=>{
                    var numberUserLikePost=0;
                    var isCurrentUserLikePost=[];
                    var userNamesLikePost=[];
                    if (post.postLikeId){
                        const reactIds= post.postLikeId;
                        const reacts= await this.reactRepos.findByIds(reactIds)
                        const listObjectIdsLike= reacts.map(react=>react.author)
                        numberUserLikePost= reacts.length
                        isCurrentUserLikePost= (reactIds.includes(new ObjectId(currentId)))
                        const users= await this.userRepos.findByIds(listObjectIdsLike)
                        userNamesLikePost=users.map(user=> user.userName)
                        return{
                            ...post,
                            userNameLikePosts: userNamesLikePost,
                            countReacts: numberUserLikePost,
                            isLike: isCurrentUserLikePost,
                        }
                    }
                    
                })
            )
        // }
        
        // return posts;
        return fullposts.length>0?fullposts:null;
    }
    async getAllPosts(usesId: string):Promise<any>{
        
        const currentUser=await this.userRepos.findOneById(usesId)
        var friendIds;
        var friends;
        var onlyFollowings;
        var posts=[];
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
        if(friendIds&&friendIds.length>0) {
            this.logger.log("hi")
            var postfromFriends=friendIds.map(async friendId=>
                {
                const name = (await this.userRepos.findOneById(new ObjectId(friendId))).userName
                if(this.isFriend(currentUser.id.toString(),friendId.toString()))
                    {
                        this.logger.log(this.isFriend(currentUser.id.toString(),friendId.toString()))

                        return this.getFriendPosts(name);
                    }
                else return null;
                })
            postfromFriends=postfromFriends.filter(post => (post !== null)||post.length>0);
        }
        if(onlyFollowings&&onlyFollowings.length>0){
            // this.logger.log(onlyFollowings)
            var postfromFollowings=onlyFollowings.map(async followingId=>{
                const name = (await this.userRepos.findOneById(new ObjectId(followingId))).userName
                return (this.getFollowPost(name)&&this.getFollowPost.length>0)? await this.getFollowPost(name):null;
            })
            postfromFollowings=postfromFollowings.filter(post => (post!==null));
        }
        // Đợi cho tất cả các Promise được giải quyết
        if (friendIds&&friendIds.length>0)var resolvedPostsFromFriends = postfromFriends ? await Promise.all(postfromFriends) : [];
        if (onlyFollowings.length>0 &&onlyFollowings)var resolvedPostsFromFollowings = postfromFollowings ? await Promise.all(postfromFollowings) : [];
        
        if (resolvedPostsFromFriends&&resolvedPostsFromFriends.length>0) posts=resolvedPostsFromFriends
        if (resolvedPostsFromFollowings&&resolvedPostsFromFollowings.length>0)posts=posts.concat(resolvedPostsFromFollowings)
        if (posts.length===0) return;
        posts=posts.filter(post=>post!==null)
        // posts.sort((a,b)=>b.postTime-a.postTime)
        // if (posts.length>0&&posts){
        //     var fullposts = await Promise.all(
        //         posts.map(async post=>{
        //             const reactIds= post.postLikeId;
        //             const reacts= await this.reactRepos.findByIds(reactIds)
        //             const listObjectIdsLike= reacts.map(react=>react.author)
        //             const numberUserLikePost= reacts.length
        //             const isCurrentUserLikePost= (reactIds.includes(new ObjectId(usesId)))
        //             const users= await this.userRepos.findByIds(listObjectIdsLike)
        //             const userNamesLikePost=users.map(user=> user.userName)
        //             return{
        //                 ...post,
        //                 userNameLikePosts: userNamesLikePost,
        //                 countReacts: numberUserLikePost,
        //                 isLike: isCurrentUserLikePost,
        //             }
        //         })
        //     )
        // }
        return posts
        // return fullposts.length>0?fullposts:null;
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
            else return null
        })
        return publicPosts;
    }

    async getFollowPost(name: string): Promise<any>{
        const user = await this.userRepos.findOne({where:{userName: name}})
        var followingPosts= await this.postRepos.findByIds(user.postIds)
        followingPosts=followingPosts.filter(post=>{
            if(post.state===1) return post
        })
        return followingPosts.length>0?followingPosts:null;
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
        }})
        return publicPosts.length>0?publicPosts[0]:null;
    }

    //tạo ra 1 bài đăng
    async createPost(postDto: PostDto, postImg: string): Promise<Poster>{
        postDto.postImg=postImg;
        postDto.state = Number(postDto.state);
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
        postDto.state = Number(postDto.state);
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
    async isFriend(current: string, other: string): Promise<Boolean>{
        const currentId= new ObjectId(current);
        const friendId= new ObjectId(other);
        const friend= await this.userRepos.findOneById(friendId);
        return friend.bestfriend.includes(currentId)
    }    
}