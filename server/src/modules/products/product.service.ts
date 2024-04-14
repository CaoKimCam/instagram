
import {Injectable} from '@nestjs/common'
import { ProductDto } from 'src/dto/product.dto';
// import { Product } from 'src/models/product.model';
import { MongoRepository, Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import {Product} from './product.entity' 
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private readonly products: MongoRepository<Product>,
    ){}

    async getProducts(): Promise<Product[]>{
        return await this.products.find();
    }

    async createProduct(productDto: ProductDto): Promise<Product>{
        const product = new Product();
        product.categoryId = productDto.categoryId;
        product.name = productDto.name;
        product.price=productDto.price;
        return await this.products.save(product);
    }

    async detailProduct(id:string): Promise<Product>{
        return await this.products.findOneById(new ObjectId(id));
    }

    async updateProduct(productDto: ProductDto, id: ObjectId): Promise<Product>{
        let toUpdate = await this.products.findOneById(new ObjectId(id));
        await this.products.update(toUpdate, productDto);
        delete toUpdate.name;
        delete toUpdate.price;
        // await this.products.delete({id:id})
        // let updated = Object.assign(toUpdate, productDto);
        return Object.assign(toUpdate, productDto);
        // return await this.products.save(updated);
    }

    async deleteProduct(id:ObjectId): Promise<boolean>{
        // const id_string= id.toString();
        const result = await this.products.delete({id:id});
        return result.affected > 0;
    }
    
}