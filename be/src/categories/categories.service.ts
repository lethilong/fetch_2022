import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private categoryModel: Model<CategoryDocument>) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new this.categoryModel(createCategoryDto);
    return await category.save();    
   
  }

  async update(id, updateCategory): Promise<Category> {
      const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategory, {new: true, runValidators: true});
      if (!updatedCategory) throw new NotFoundException('Category does not exist')
      else return updatedCategory;  
  }

  async remove(id) {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw new BadRequestException('Category does not exist');
    } else {
      return {
        message: 'Deleted category'
      }
    }
    
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryModel.find();
    return categories;  
  }

  async findOne(id): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new BadRequestException('Category does not exist')
    }
    else {
      return category;
    } 
  }

}
