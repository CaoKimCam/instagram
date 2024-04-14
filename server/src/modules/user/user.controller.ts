import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { ValidationPipe } from "src/validation.pipe";
import { UserDto } from "src/dto/user.dto";
import { ObjectId } from "mongodb";

@Controller('users')
export class UserController{
    constructor(private readonly productService: UserService){}
    @Get()
    async getProducts(): Promise<User[]>{
        return await this.productService.getAllUsers();
    }


    // @Body(new ValidationPipe)
    @Post()
    async createProduct(@Body(new ValidationPipe) productDto: UserDto): Promise<UserDto>{
        return await this.productService.createProduct(productDto);
    }

    @Get('/:id')
    async detailProduct(@Param ('id') id:ObjectId): Promise<User>{
        const id_string= id.toString();
        return await this.productService.detailProduct(id_string); 
    }

    @Put('/:id')
    async updateProduct(@Body() productDto: UserDto, @Param('id') id: ObjectId): Promise<User>{
        // const id_string= id.toString();
        return await this.productService.updateProduct(productDto, id);
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id:ObjectId): Promise<boolean>{
        return await this.productService.deleteProduct(id);
    }
}