import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn} from 'typeorm'

@Entity('posts')
export class Poster{
    @ObjectIdColumn()
    postId: ObjectId;

    @Column()
    postContent: string;

    @Column()
    postImg: string;

    @Column()
    authorId: ObjectId;

    @Column(() => ObjectId)
    commentId: ObjectId[]=[];//để lấy like của cmt, từ đó lấy ra cả likeId
    
    @Column(() => ObjectId)
    postLikeId: ObjectId[]=[];//lấy like của post

    @Column()
    state: boolean;//true: hiển, false: ẩn
}