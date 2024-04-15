import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { ValidationPipe } from "src/validation.pipe";
import { UserDto } from "src/dto/user.dto";
import { ObjectId } from "mongodb";
import { SignUpDto } from "src/dto/user/signup.dto";
import { LoginDto } from "src/dto/user/login.dto";

@Controller('users')
export class UserController{
    constructor(private readonly productService: UserService){}

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto): Promise <{token: string}>{
        return await this.productService.signUp(signUpDto);
    }

    @Get('/login')
    async login(@Body() loginDto: LoginDto): Promise<{token: string}>{
        return this.productService.login(loginDto);
    }

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