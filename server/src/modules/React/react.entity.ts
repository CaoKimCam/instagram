import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn} from 'typeorm'

@Entity('likes')
export class React{
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    author: ObjectId;

    @Column()
    time: Date;
    
    @Column()
    type: boolean=true; //true: post, false: cmt

    @Column()
    objectId: ObjectId;//đối tượng like: post hoặc cmt
}