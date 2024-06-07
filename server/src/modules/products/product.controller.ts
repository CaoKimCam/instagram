import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import {ResponseData} from '../../global/globalClass'
import { HttpMessage, HttpStatus } from "../../global/globalEnum";
import {Product} from "src/models/product.model"
import { ProductDto } from "src/dto/product.dto";

@Controller('products')
export class ProductController{

    constructor(private readonly productService: ProductService){}
    @Get()
    getProducts(): ResponseData<Product[]>{
        try{
            return new ResponseData<Product[]>(this.productService.getProducts(), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch(err){
            return new ResponseData<Product[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post()
    createProduct(@Body(new ValidationPipe) productDto: ProductDto): ResponseData<ProductDto>{
        try{
            return new ResponseData<Product>(this.productService.createProduct(productDto), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch(err){
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/:id')
    detailProduct(@Param ('id') id:number): ResponseData<Product>{
        try{
            return new ResponseData<Product>(this.productService.detailProduct(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch(err){
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }    
    }

    @Put('/:id')
    updateProduct(@Body() productDto: ProductDto, @Param('id') id: number): ResponseData<Product>{
        try{
            return new ResponseData<Product>(this.productService.updateProduct(productDto, id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch(err){
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }    }

    @Delete('/:id')
    deleteProduct(): ResponseData<string>{
        try{
            return new ResponseData<string>(this.productService.deleteProduct(), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch(err){
            return new ResponseData<string>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }    
    }
}