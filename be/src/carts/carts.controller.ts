import { Controller, Get, Post, Body, Patch, Param, Delete, Ip } from '@nestjs/common';
import { CartsService } from './carts.service';
import { ChangeCartDto } from './dto/change-Cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('add')
  addToCart(@Ip() ip,  @Body() changeCartDto: ChangeCartDto) {
    return this.cartsService.addToCart(ip, changeCartDto);
  }

  @Post('remove')
  removeFromCart(@Ip() ip,  @Body() changeCartDto: ChangeCartDto) {
    return this.cartsService.removeFromCart(ip, changeCartDto);
  }

  @Get()
  getCart(@Ip() ip) {
    return this.cartsService.getCart(ip);
  }
}
