import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn, PrimaryColumn} from 'typeorm'

@Entity('products')
export class Product{
    @ObjectIdColumn()
    // @PrimaryColumn()
    id: ObjectId;

    // @PrimaryColumn()
    // id:number;

    @Column()
    categoryId: number;

    @Column()
    name: string;

    @Column()
    price: number;
}