import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn, PrimaryColumn} from 'typeorm'

@Entity('users')
export class User{
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    userName: string;

    @Column()
    userPassword: string;

    @Column()
    userEmail: string;

    @Column()
    userAvatar: string;

    @Column()
    userBio: string;

    @Column()
    followers: ObjectId[]=[];

    @Column()
    followings: ObjectId[]=[];

    @Column()
    postSave: ObjectId[]=[];

    @Column()
    postIds: ObjectId[]=[];//bài post mình đăng

    @Column()
    likeIds: ObjectId[]=[];//post hoặc cmt mình like, có thể cân nhắc để 2 cột riêng

    @Column()
    commentIds: ObjectId[]=[];// comment mình comment
}