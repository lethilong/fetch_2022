import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from 'src/products/schemas/product.schema';
import { ChangeCartDto } from './dto/change-Cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartsService {

  constructor(
    @InjectModel('Cart') private cartModel: Model<CartDocument>,
    @InjectModel('Product') private productModel: Model<ProductDocument>
    ){}

  async addToCart(customerIp, changeCartDto: ChangeCartDto): Promise<Cart>{
    const {productId} = changeCartDto;
    let cart = await this.cartModel.findOne({customerIp: customerIp});
    if (!cart) {
      cart = await this.cartModel.create({customerIp: customerIp, items: []});
    }

    const product = await this.productModel.findById(productId);
    console.log(product);
    if (!product) {
      throw new NotFoundException('Product does not exist');
    }
    else {
      const index = cart.items.findIndex(item => item.productId === productId);
    
      if (index == -1) {
        cart.items.push({...changeCartDto, quantity: 1});
      } else {
      // cart.items.forEach(((item) => {
      //   if (item.productId === productId) {
      //     item.quantity++;
      //   }
      // }));
        cart.items[index].quantity++;
      }
      console.log(cart);
      const updatedcart = await this.cartModel.findOneAndUpdate({customerIp: customerIp}, cart, {new: true});
      return updatedcart;
    } 
  }

  async removeFromCart(customerIp, changeCartDto: ChangeCartDto): Promise<Cart> {
    const {productId} = changeCartDto;
    const cart = await this.cartModel.findOne({customerIp});
    if (!cart) {
      throw new NotFoundException('Cart does not exist');
    } else {
      const index = cart.items.findIndex(item => item.productId === productId);
      if (index == -1) {
        throw new NotFoundException('Cannot find this product in cart');
      } else {
        const qty = --cart.items[index].quantity;
        console.log(qty)
        if (qty == 0) cart.items.splice(index, 1);
      }
      console.log(cart);
      const updatedcart = await this.cartModel.findOneAndUpdate({customerIp: customerIp}, cart, {new: true});
      return updatedcart;
    }
  }



  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all carts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
