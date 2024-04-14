import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { MongoRepository } from "typeorm";
import { UserDto } from "src/dto/user.dto";
import { ObjectId } from "mongodb";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepos: MongoRepository<User>,
    ){}

    async getAllUsers(): Promise<User[]>{
        return await this.userRepos.find();
    }

    async createProduct(userDto: UserDto): Promise<User>{
        const newUser = new User();
        newUser.userName = userDto.userName;
        newUser.userBio=userDto.userBio;
        // const product = this.products.create(productDto);
        return await this.userRepos.save(newUser);
    }

    async detailProduct(id:string): Promise<User>{
        return await this.userRepos.findOneById(new ObjectId(id));
    }

    async updateProduct(productDto: UserDto, id: ObjectId): Promise<User>{
        let toUpdate = await this.userRepos.findOneById(new ObjectId(id));
        // await this.products.update(productid, productDto);
        // delete toUpdate.name;
        // delete toUpdate.price;
        await this.userRepos.delete({id:id})
        let updated = Object.assign(toUpdate, productDto);
        return await this.userRepos.save(updated);
    }

    async deleteProduct(id:ObjectId): Promise<boolean>{
        // const id_string= id.toString();
        const result = await this.userRepos.delete({id:id});
        return result.affected > 0;
    }
}