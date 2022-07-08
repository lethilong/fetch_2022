import { Controller, Get, Post, Body, Patch, Param, Delete, Ip, UseGuards, Request } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CartsService } from './carts.service';
import { ChangeCartDto } from './dto/change-Cart.dto';

@UseGuards(JwtAuthGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('add')
  addToCart(@Request() req, @Body() changeCartDto: ChangeCartDto) {
    return this.cartsService.addToCart(req.user.id, changeCartDto);
  }

  @Post('remove')
  removeFromCart(@Request() req,  @Body() changeCartDto: ChangeCartDto) {
    return this.cartsService.removeFromCart(req.user.id, changeCartDto);
  }

  @Get()
  getCart(@Request() req) {
    return this.cartsService.getCart(req.user.id);
  }

  @Delete('items/:id')
  deleteItem(@Request() req, @Param('id') id: string) {
    return this.cartsService.deleteItem(req.user.id, id);
  }
}
