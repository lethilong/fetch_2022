import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrdersModule } from './orders/orders.module';
import { CartsModule } from './carts/carts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..', 'public'),
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI), 
    ProductsModule, CategoriesModule, OrdersModule, CartsModule, AuthModule, UsersModule, PaymentsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
