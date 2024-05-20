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

    @Column()
    state: boolean;//true: hiển, false: ẩn

    @Column()
    commentIds: ObjectId[]=[];//để lấy cmt, từ đó lấy ra cả likeId
    
    @Column()
    postLikeId: ObjectId[]=[];//lấy like của post
}