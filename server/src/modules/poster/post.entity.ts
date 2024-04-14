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
    reactId: string;
}