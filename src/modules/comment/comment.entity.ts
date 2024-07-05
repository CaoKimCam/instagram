import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn} from 'typeorm'

@Entity('comments')
export class Comment{
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    content:string;

    @Column()
    time: Date;

    @Column()//tác giả của cmt này
    authorId: ObjectId;

    @Column()//bài đăng gốc
    postId: ObjectId;

    @Column()
    likeId: ObjectId[]=[];
}