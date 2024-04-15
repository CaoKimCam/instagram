import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private readonly userRepos: MongoRepository<User>,
    )
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
          });
    }
    
  async validate(payload) {
    const { id } = payload;

    const user = await this.userRepos.findOneById(id);

    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    return user;
  }
}