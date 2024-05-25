import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { UserController } from "./user.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

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
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService, JwtModule],
    exports:[JwtModule, PassportModule]
})

export class UserModule{};
