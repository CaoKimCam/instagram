import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModle } from './modules/products/product.module';

@Module({
  imports: [ProductModle],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
