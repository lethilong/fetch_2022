import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from 'src/products/schemas/product.schema';
import { CreateOrderDto, OrderItemDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>, 
    @InjectModel('Product') private readonly productModel: Model<ProductDocument>){}
  async createOrder(orderDto: CreateOrderDto): Promise<Order>{
    const orderItems = Promise.all(orderDto.products.map((orderItem) =>{
        // let newOrderItem = {
        //     product: orderItem.product,
        //     quantity ?: orderItem.quantity
        // }
        let newOrderItem = orderItem;

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
        customer: orderDto.customer
    });

    await newOrder.save();
    updateQuantity();
    return newOrder;
  }



  async findAll(): Promise<Order[]>{
    const orders = await this.orderModel.find();
    return orders;
  }

  async findOne(id): Promise<Order> {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('Order with this ID does not exist');
    } else {
      return order
    }
  }

  update(id, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id) {
    return `This action removes a #${id} order`;
  }
}
