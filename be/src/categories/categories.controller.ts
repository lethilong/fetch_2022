import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseFilters, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import * as uuid from 'uuid';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  // @UseFilters(new MongoExceptionFilter())
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/images',
      filename: (req, file, cb) => {
        cb(null, uuid.v4()+'.png');
      }
    })
  }))
  
  async create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile() file: Express.Multer.File) {
    if (file)
      createCategoryDto.image = `http://localhost:3000/images/${file.filename}`
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
