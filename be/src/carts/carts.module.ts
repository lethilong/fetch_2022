import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from './schemas/cart.schema';
import { ProductSchema } from 'src/products/schemas/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Cart', schema: CartSchema}, {name: 'Product', schema: ProductSchema}])],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule {}
