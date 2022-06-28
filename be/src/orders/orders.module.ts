import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { ProductSchema } from 'src/products/schemas/product.schema';

@Module({ 
  imports: [MongooseModule.forFeature([{name: 'Order', schema: OrderSchema}, {name: 'Product', schema: ProductSchema}])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
