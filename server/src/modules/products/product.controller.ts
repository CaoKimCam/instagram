import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
// import {ResponseData} from '../../global/globalClass'
// import { HttpMessage, HttpStatus } from "../../global/globalEnum";
import { Product } from "./product.entity";
import { ProductDto } from "src/dto/product.dto";
import { ObjectId } from "typeorm";

@Controller('products')
export class ProductController{

    constructor(private readonly productService: ProductService){}
    @Get()
    async getProducts(): Promise<Product[]>{
        return await this.productService.getProducts();
    }


    // @Body(new ValidationPipe)
    @Post()
    async createProduct(@Body(new ValidationPipe) productDto: ProductDto): Promise<ProductDto>{
        return await this.productService.createProduct(productDto);
    }

    @Get('/:id')
    async detailProduct(@Param ('id') id:ObjectId): Promise<Product>{
        const id_string= id.toString();
        return await this.productService.detailProduct(id_string); 
    }

    @Put('/:id')
    async updateProduct(@Body() productDto: ProductDto, @Param('id') id: ObjectId): Promise<Product>{
        // const id_string= id.toString();
        return await this.productService.updateProduct(productDto, id);
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id:ObjectId): Promise<boolean>{
        return await this.productService.deleteProduct(id);
    }
}