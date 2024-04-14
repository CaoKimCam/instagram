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
}