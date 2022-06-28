import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<ProductDocument>) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return await product.save();
   
    
  }

  async update(id, product): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, product, {new: true});
    if (!updatedProduct) throw new NotFoundException('Product not found');
    else return updatedProduct;
    
  }

  async remove(id): Promise<void> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct) throw new NotFoundException('Product not found');

  }

  async findAll(getProductsDto): Promise<Product[]> {
    const { page, sort, limit, category, search, minPrice, maxPrice} = getProductsDto;
    const searchQuery = search ? {name: new RegExp(search, 'i')} : {};
    const categoryQuery = category ? {category:{_id: category}} : {};
    const minPriceQuery = minPrice ? {$gte: minPrice}: {};
    const maxPriceQuery = maxPrice ? {$lte: maxPrice} : {};
    const priceQuery = minPrice || maxPrice ? {price: {...minPriceQuery, ...maxPriceQuery}} : {};
    const query = {...searchQuery, ...categoryQuery, ...priceQuery};
    const option = {
      sort: this.prepareSort(sort),
      limit: limit
    }

    const products =  await this.productModel.find(query).sort(option.sort).limit(option.limit);
    return products;
  }
  private prepareSort =(sort): string => {
    switch(sort) {
      case 'newest':
        return '-createdAt'
      case 'oldest':
        return 'createdAt'
      case 'priceasc':
        return 'price'
      case 'pricedesc':
        return '-price'
      default:
        return '-createdAt'
    }
     

  }

  async findOne(id): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  
}
