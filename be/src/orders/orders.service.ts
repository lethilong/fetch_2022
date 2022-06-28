import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from 'src/products/schemas/product.schema';
import { CreateOrderDto, OrderItemDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>, 
    @InjectModel('Product') private readonly productModel: Model<ProductDocument>){}
  async createOrder(orderDto: CreateOrderDto){
    const orderItems = Promise.all(orderDto.products.map((orderItem) =>{
        let newOrderItem = {
            product: orderItem.product,
            quantity: orderItem.quantity || 1
        }

        return newOrderItem;
    }));
    const orderItemsResolved =  await orderItems;

    const totalPrices = await Promise.all(orderItemsResolved.map(async (orderItem)=>{
        const product = await this.productModel.findById(orderItem.product);

        if(product.quantity < orderItem.quantity)
            throw new BadRequestException("Product with id of " + product.id + " does not have enough stock");

        // calculate price of each item
        const totalPrice = product.price * orderItem.quantity;
        return totalPrice
    }));
    const updateQuantity = ()=>(orderItemsResolved.map(async (orderItem)=>{
      const product = await this.productModel.findById(orderItem.product);
      product.quantity -= orderItem.quantity;
      await product.save();
    }))

    const totalPrice = totalPrices.reduce((total,price) => total + price , 0);

    const newOrder = new this.orderModel({
        items: orderItemsResolved,
        totalPrice: totalPrice,
    });

    await newOrder.save();
    updateQuantity();
    return newOrder.toJSON();
  }



  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
