import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
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
  async createOrder(customerId, orderDto: CreateOrderDto): Promise<Order>{
    const orderItemsResolved =orderDto.products;
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
        customerId: customerId,
        items: orderItemsResolved,
        totalPrice: totalPrice,
        delivery: orderDto.delivery
    });

    await newOrder.save();
    updateQuantity();
    return newOrder;
  }



  async findAll(query): Promise<Order[]>{
    const {status} = query;
    const statusQuery = status?{status: status}:{}
    const orders = await this.orderModel.find(statusQuery);
    return orders;
  }

  async findMyOrders(customerId): Promise<Order[]> {
    const orders = await this.orderModel.find({customerId}).sort('-createdAt');
    return orders;
  }

  async findOne(id): Promise<Order> {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('Order does not exist');
    } else {
      return order
    }
  }

  async update(id, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, {new: true, runValidators: true});
    if (!order) {
      throw new NotFoundException('Order does not exist');
    } else {
      return order;
    }
  }

  async cancelOrder(id, customerId) {
    const order = await this.orderModel.findOne({id: id, customerId});
    if (!order) {
      throw new NotFoundException('Order does not exist');
    } else {
      if (order.status != 'pending') {
        throw new NotAcceptableException(`Your order is in ${order.status} status. Can not cancel`);
      } else {
        order.status = 'cancelled';
      }
    }
    await order.save();
    return order;
  }
}
