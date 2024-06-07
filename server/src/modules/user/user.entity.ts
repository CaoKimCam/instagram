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
    followers: ObjectId[]=[];//người theo dõi mình
    @Column()
    followings: ObjectId[]=[];//người mình đang theo dõi
    @Column()
    friend: ObjectId[]=[];//bạn bè
    @Column()
    bestFriend:ObjectId[]=[];//người tuỳ chỉnh xem bài viết

    @Column()
    postSaved: ObjectId[]=[];//bài viết đã lưu


    @Column()
    postIds: ObjectId[]=[];//bài viết mình đăng
    @Column()
    likeIds: ObjectId[]=[];//post hoặc cmt mình like, có thể cân nhắc để 2 cột riêng
    @Column()
    commentIds: ObjectId[]=[];// comment mình comment
}