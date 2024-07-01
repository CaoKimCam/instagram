import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { ValidationPipe } from "src/validation.pipe";
import { ApiTags } from "@nestjs/swagger";
import { ReactService } from "./react.service";
import { ReactDto } from "src/dto/react.dto";
import { React } from "./react.entity";
import { JwtAuthGuard } from "../user/jwt-auth.guard";

@Controller('/likes')
@ApiTags('REACTS')
export class ReactController{

    constructor(private readonly productService: ReactService){}
    
    @UseGuards(JwtAuthGuard)
    @Get('/allreacts/')//all reacts only by admin
    async getReacts(): Promise<React[]>{
        return await this.productService.getReacts();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/reacts/:id')
    async getReactsByObjectId(@Param('id') id: string){
        return await this.productService.getReactsByObjectId(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createReact(@Body(new ValidationPipe) reactDto: ReactDto): Promise<React>{
        return await this.productService.createReacts(reactDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/react/:id')
    async detailReact(@Param ('id') id:ObjectId): Promise<React>{
        const id_string= id.toString();
        return await this.productService.detailReacts(id_string); 
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deleteReact(@Param('id') id:ObjectId): Promise<boolean>{
        return await this.productService.deleteReact(id);
    }
}