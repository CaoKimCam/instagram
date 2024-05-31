import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn} from 'typeorm'

@Entity('posts')
export class Poster{
    @ObjectIdColumn()
    postId: ObjectId;

    @Column()
    postContent: string;

    @Column('text')
    postImg: string;

    @Column()
    authorId: ObjectId;

    @Column()
    postTime: Date;

    @Column()
    buffer: Buffer;

    @Column()
    mimetype: string;

    @Column()
    state: boolean;//tạo 1 enum
    //các chế độ: private, public,...

    @Column({default: true})
    isShow: boolean;//ẩn, hiển

    @Column()
    commentIds: ObjectId[]=[];//để lấy cmt, từ đó lấy ra cả likeId
    
    @Column()
    postLikeId: ObjectId[]=[];//lấy like của post
}