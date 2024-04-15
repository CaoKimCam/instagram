import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn, PrimaryColumn} from 'typeorm'

@Entity('products')
export class Product{
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    categoryId: number;

    @Column()
    name: string;

    @Column()
    price: number;
}

// export enum Category {
//     ADVENTURE = 'Adventure',
//     CALSSICS = 'Classics',
//     CRIME = 'Crime',
//     FANTASY = 'Fantasy',
//   }