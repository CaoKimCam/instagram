import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/products/product.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/poster/post.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mongodb',
        url:'mongodb://localhost:27017',
        synchronize: true,
        autoLoadEntities: true,
        // useUnifiedTopolory: true,
        entities: [__dirname+'src/**/*.entity{.ts,.js}'],    }
    ),
    ProductModule,
    UserModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// 'mongodb+srv://21520641:j9Mg5HyJxJ6tDQ71@cluster.dkpd6sl.mongodb.net/'