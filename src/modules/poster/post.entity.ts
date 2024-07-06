import { Int32, ObjectId } from 'mongodb';
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

    @Column({default:0})
    state: Number;//tạo 1 enum
    //các chế độ: 1 public 2 follow 3 friend 4 best-friend 5 private
    @Column({default: true})
    isShow: boolean;//ẩn, hiển

    @Column()
    commentIds: ObjectId[]=[];//để lấy cmt, từ đó lấy ra cả likeId
    
    @Column()
    postLikeId: ObjectId[]=[];//lấy like của post
}