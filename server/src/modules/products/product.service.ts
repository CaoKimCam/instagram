
import {Injectable, Module} from '@nestjs/common'
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductService {

    private products: Product[]=[
        {id:1, categoryId:2, price:80000, productName: "Keyboard"},
        {id:2, categoryId:3, price:90000, productName: "Ninedev"},
    ]

    getProducts(): Product[]{
        return this.products;
    }

    createProduct(): string{
        return 'POST PRODUCT';
    }

    detailProduct(): string{
        return 'DETAIL PRODUCT';
    }

    updateProduct(): string{
        return 'UPDATE PRODUCT';
    }

    deleteProduct(): string{
        return 'DELETE PRODUCT';
    }
}