import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from 'src/products/schemas/product.schema';
import { ChangeCartDto } from './dto/change-Cart.dto';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartsService {

  constructor(
    @InjectModel('Cart') private cartModel: Model<CartDocument>,
    @InjectModel('Product') private productModel: Model<ProductDocument>
    ){}

  async addToCart(customerId, changeCartDto: ChangeCartDto): Promise<Cart>{
    const {product, quantity} = changeCartDto;
    const qtyProductChange = quantity || 1;
    let cart = await this.cartModel.findOne({customerId: customerId});
    if (!cart) {
      cart = await this.cartModel.create({customerId: customerId, items: []});
    }

    const existedProduct = await this.productModel.findById(product);
    if (!existedProduct) {
      throw new NotFoundException('Product does not exist');
    }
    else {
      const index = cart.items.findIndex(item => item.product == product);
      if (index == -1) {
        cart.items.push({...changeCartDto, quantity: qtyProductChange});
      } else {
        cart.items[index].quantity+=qtyProductChange;
      }
      const updatedCart = await this.cartModel.findOneAndUpdate({customerId: customerId}, cart, {new: true});
      return updatedCart;
    } 
  }

  async removeFromCart(customerId, changeCartDto: ChangeCartDto): Promise<Cart> {
    const {product, quantity} = changeCartDto;
    const qtyProductChange = quantity || 1;
    const cart = await this.cartModel.findOne({customerId});
    if (!cart) {
      throw new NotFoundException('Cart does not exist');
    } else {
      const index = cart.items.findIndex(item => item.product == product);
      if (index == -1) {
        throw new NotFoundException('Can not find this product in cart');
      } else {
        cart.items[index].quantity-=qtyProductChange;
        if (cart.items[index].quantity == 0) cart.items.splice(index, 1);
      }
      const updatedCart = await this.cartModel.findOneAndUpdate({customerId: customerId}, cart, {new: true});
      return updatedCart;
    }
  }

  async deleteItem(customerId, productId): Promise<Cart> {
    const cart = await this.cartModel.findOne({customerId});
    if (!cart) {
      throw new NotFoundException('Cart does not exist');
    } else {
      const index = cart.items.findIndex(item => item.product == productId);
      if (index == -1) {
        throw new NotFoundException('Can not find this product in cart ');
      } else {
        cart.items.splice(index, 1);
      }
      const updatedCart = await this.cartModel.findOneAndUpdate({customerId}, cart, {new: true});
      return cart;
    }
  }

  async getCart(customerId): Promise<Cart> {
    const cart = await this.cartModel.findOne({customerId}).populate('items.product');
    return cart;
  }

}
