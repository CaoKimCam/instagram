import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { ValidationPipe } from "src/validation.pipe";
import { ApiTags } from "@nestjs/swagger";
import { ReactService } from "./react.service";
import { ReactDto } from "src/dto/react.dto";
import { React } from "./react.entity";

@Controller('/likes')
@ApiTags('LIKES')
export class ReactController{

    constructor(private readonly productService: ReactService){}
    @Get()
    async getProducts(): Promise<React[]>{
        return await this.productService.getReacts();
    }


    // @Body(new ValidationPipe)
    @Post()
    async createProduct(@Body(new ValidationPipe) reactDto: ReactDto): Promise<React>{
        return await this.productService.createReacts(reactDto);
    }

    @Get('/:id')
    async detailProduct(@Param ('id') id:ObjectId): Promise<React>{
        const id_string= id.toString();
        return await this.productService.detailReacts(id_string); 
    }

    // @Put('/:id')
    // async updateProduct(@Body() productDto: ReactDto, @Param('id') id: ObjectId): Promise<React>{
    //     // const id_string= id.toString();
    //     return await this.productService.updateReact(productDto, id);
    // }

    @Delete('/:id')
    async deleteProduct(@Param('id') id:ObjectId): Promise<boolean>{
        return await this.productService.deleteReact(id);
    }
}