import { Injectable, Logger, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { ObjectId } from "mongodb";
import { MongoRepository } from "typeorm";
import { equal } from "assert";

@Injectable()
export class FollowService{
    private readonly logger = new Logger(FollowService.name);
    constructor(
        @InjectRepository(User)
        private readonly userRepos: MongoRepository<User>,
    ){}
    async acceptFollow(followerId: ObjectId, followingId:ObjectId){
        //following là người đang thực hiện (currenUser)
        const follower = await this.userRepos.findOneById(followerId);
        const following = await this.userRepos.findOneById(followingId);
        if(!follower || !following){
            throw new NotFoundException('User not found!');
        }
        following.followers.push(followerId);
        follower.followings.push(followingId);
        //xoá trong hàng đợi: xoá tính năng inQueue
        // follower.followingsInQueue=follower.followersInQueue.filter(id=>!id.equals(followingId));
        // following.followersInQueue=following.followersInQueue.filter(id=>!id.equals(followerId));
        await this.userRepos.save(follower);
        await this.userRepos.save(following);
    }

    async unfollowUser(followerId:ObjectId, followingId:ObjectId){
        const follower = await this.userRepos.findOneById(followerId);
        const following = await this.userRepos.findOneById(followingId);
    
        if (!follower || !following) {
          throw new NotFoundException('User not found');
        }
    
        follower.followings = follower.followings.filter(id => !id.equals(followingId));
        if(following.state)following.followers = following.followers.filter(id => !id.equals(followerId));
    
        await this.userRepos.save(follower);
        await this.userRepos.save(following);
    }
    async addBestFriend(current: ObjectId, other: string){
        const friend= await this.userRepos.findOne({
            where:{userName: other}
        })
        const currentUser= await this.userRepos.findOneById(current);
        if (currentUser&&friend) 
        {
            if (currentUser.bestfriend) currentUser.bestfriend.push(friend.id);
        } else throw new NotFoundException('User not found!')
        return await this.userRepos.save(currentUser)
    }  

    async removeBestFriend(current: ObjectId, other: string){
        const friend= await this.userRepos.findOne({
            where:{userName: other}
        })
        const currentUser= await this.userRepos.findOneById(current);
        if (currentUser&&friend) 
        {
            if (currentUser.bestfriend) currentUser.bestfriend=currentUser.bestfriend.filter(id=>!id.equals(friend.id));
        } else throw new NotFoundException('User not found!')
        return await this.userRepos.save(currentUser)
    }  
    async isFriend(current: ObjectId, nameOther: string): Promise<Boolean>{
        const friend= await this.userRepos.findOne({
            where:{userName: nameOther}
        })
        return (friend.followers.includes(current)&&friend.followings.includes(current))?true: null
    }   
}