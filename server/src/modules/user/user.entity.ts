import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn, PrimaryColumn} from 'typeorm'

@Entity('users')
export class User{
    @ObjectIdColumn()
    id: ObjectId;

    @Column({default: true})
    state:Boolean;

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

    @Column({ type: 'array', default: [] })
    bestfriend: ObjectId[]=[];

    @Column({ type: 'array', default: [] })
    followers: ObjectId[]=[];//người theo dõi mình
    @Column({ type: 'array', default: [] })
    followings: ObjectId[]=[];//người mình đang theo dõi

    @Column()
    postSaved: ObjectId[]=[];//bài viết đã lưu
    @Column()
    postIds: ObjectId[]=[];//bài viết mình đăng
    @Column()
    likeIds: ObjectId[]=[];//post hoặc cmt mình like, có thể cân nhắc để 2 cột riêng
    @Column()
    commentIds: ObjectId[]=[];// comment mình comment
}