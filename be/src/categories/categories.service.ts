import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoError } from 'mongodb';
import mongoose, { Model, MongooseError } from 'mongoose';
import { diskStorage } from 'multer';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private categoryModel: Model<CategoryDocument>) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    if(!createCategoryDto.name) throw new BadRequestException('Name cannot be empty');
    try {
      const category = new this.categoryModel(createCategoryDto);
      return await category.save();    
    }
    catch(err) {
      console.log(err.name);
      console.log(typeof err);
      console.log(err);
      throw err;
    //  if (err.code == '11000') throw new BadRequestException('Duplicate name');
    //  else throw err;
    }
  }

  async update(id, updateCategory): Promise<Category> {
    try {
      const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategory, {new: true});
      if (!updatedCategory) throw new NotFoundException('Category not found')
      else return updatedCategory;
    } catch(err) {
      throw err;
      // if (err instanceof mongoose.Error.CastError) throw new BadRequestException('Invalid id')
      // else throw err;
    }
    
  }

  async remove(id): Promise<void> {
    try{
      const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
      if (!deletedCategory) throw new BadRequestException('Category not found');
    } catch(err) {
      if (err instanceof mongoose.Error.CastError) throw new BadRequestException('Invalid id')
      else throw err;
    }
    
  }

  async findAll(): Promise<Category[]> {
    try {
      const categories = await this.categoryModel.find();
      return categories;
    } catch(err) {
      throw err;
    }
   
  }

  async findOne(id): Promise<Category> {
    try {
      const category = await this.categoryModel.findById(id);
      if (!category) throw new BadRequestException('Category not found')
      else return category;
    } catch(err) {
      if (err instanceof mongoose.Error.CastError) throw new BadRequestException('Category not found');
      else throw err;
    }
    
  }

}
