import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as uuid from 'uuid';
import { GetProductsDto } from './dto/get-products.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/images',
      filename: (req, file, cb) => {
        cb(null, uuid.v4()+'.png');
      }
    })
  }))
  
  async create(@Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      createProductDto.image = `${process.env.BASE_URL}images/${file.filename}`
    }     
    return this.productsService.create(createProductDto);
  }
 
  @Get()
  findAll(@Query() getProductsDto: GetProductsDto) {
    return this.productsService.findAll(getProductsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/images',
      filename: (req, file, cb) => {
        cb(null, uuid.v4()+'.png');
      }
    })
  }))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,  @UploadedFile() file: Express.Multer.File) {
    if (file) {
      updateProductDto.image = `${process.env.BASE_URL}images/${file.filename}`
    }  
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
