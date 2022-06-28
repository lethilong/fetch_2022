import { Controller, Get, Post, Body, Patch, Param, Delete, Ip } from '@nestjs/common';
import { CartsService } from './carts.service';
import { ChangeCartDto } from './dto/change-Cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

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
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
