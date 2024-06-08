import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { UserController } from "./user.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStategy } from "./jwt.strategy";
import { CloudinaryProvider } from "../cloudinary/cloudinary";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { ReactModule } from "../react/react.module";
import { CommentModule } from "../comment/comment.module";
import { PostModule } from "../poster/post.module";

@Module({
    imports: [
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.registerAsync({
            inject:[ConfigService],
            useFactory:(config: ConfigService)=>{
                return{
                    secret: config.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: config.get<string | number>('JWT_EXPIRES'),
                    },
                }
            }
        }),
        TypeOrmModule.forFeature([User]),
        forwardRef(()=>ReactModule), forwardRef(()=>CommentModule), forwardRef(()=>PostModule)
    ],
    controllers: [UserController],
    providers: [UserService, JwtStategy, CloudinaryService, CloudinaryProvider],
    exports:[JwtModule, PassportModule, UserService]
})

export class UserModule{};
