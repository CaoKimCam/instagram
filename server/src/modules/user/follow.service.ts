import { Injectable, Logger, NotFoundException, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { ObjectId } from "mongodb";
import { MongoRepository } from "typeorm";

@Injectable()
export class FollowService{
    private readonly logger = new Logger(FollowService.name);
    constructor(
        @InjectRepository(User)
        private readonly userRepos: MongoRepository<User>,
    ){}

    async followInQueue(followerId: ObjectId, followingId:ObjectId){
        //follower là người đang thực hiện theo dõi.
        const follower = await this.userRepos.findOneById(followerId);
        const following = await this.userRepos.findOneById(followingId);
        if(!follower || !following){
            throw new NotFoundException('User not found!');
        }
        
        follower.followingsInQueue.push(followingId);
        following.followersInQueue.push(followerId);
        await this.userRepos.save(follower);
        await this.userRepos.save(following);
    }

    async deletefollowInQueue(followerId: ObjectId, followingId:ObjectId){
        const follower = await this.userRepos.findOneById(followerId);
        const following = await this.userRepos.findOneById(followingId);
        if(!follower || !following){
            throw new NotFoundException('User not found!');
        }
        
        follower.followingsInQueue =follower.followingsInQueue.filter(id=>!id.equals(followingId));
        following.followersInQueue =following.followersInQueue.filter(id=>!id.equals(followerId));
        
        await this.userRepos.save(follower);
        await this.userRepos.save(following);
        return true;
    }

    async acceptFollow(followerId: ObjectId, followingId:ObjectId){
        //following là người đang thực hiện (currenUser)
        const follower = await this.userRepos.findOneById(followerId);
        const following = await this.userRepos.findOneById(followingId);
        if(!follower || !following){
            throw new NotFoundException('User not found!');
        }
        following.followers.push(followerId);
        follower.followings.push(followingId);
        //xoá trong hàng đợi
        follower.followingsInQueue=follower.followersInQueue.filter(id=>!id.equals(followingId));
        following.followersInQueue=following.followersInQueue.filter(id=>!id.equals(followerId));
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
}