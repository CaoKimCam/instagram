import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn} from 'typeorm'

@Entity('comments')
export class Comment{
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    content:string;

    @Column()//tác giả của cmt này
    author: ObjectId;

    @Column()
    commentTime: Date;

    @Column()//bài đăng gốc
    postId: ObjectId;

    @Column()
    likeId: ObjectId[]=[];
}