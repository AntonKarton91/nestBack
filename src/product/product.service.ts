import mongoose, { Model, Types } from "mongoose";
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from "./dto/product.dto";
import { Product, ProductDocument } from "./schemas/product.schema";
import {ProductOptionCategoryDto} from "./dto/productOptionCategory.dto";
import {ProductOptionCategory, ProductOptionCategoryDocument} from "./schemas/productOptionCategory.schema";
import {ProductOptionItem, ProductOptionItemDocument} from "./schemas/productOptionItem.schema";
import {ProductOptionItemDto} from "./dto/productOptionItem.dto";


@Injectable()
export class ProductService {
  constructor(
      @InjectModel(Product.name) private productModel: Model<ProductDocument>,
      @InjectModel(ProductOptionCategory.name) private productOptionCategory: Model<ProductOptionCategoryDocument>,
      @InjectModel(ProductOptionItem.name) private productOptionItem: Model<ProductOptionItemDocument>,
  ) {}

  async create(dto: ProductDto): Promise<Product> {
    const createdProduct = await this.productModel.create(dto);
    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findById(id: mongoose.Schema.Types.ObjectId): Promise<Product> | null {
    return this.productModel.findById(id).populate("options").populate("options")
  }

  async createOptionCat(dto: ProductOptionCategoryDto): Promise<ProductOptionCategory> {
    const product = await this.productModel.findById(dto.product)
    const createdCat = await this.productOptionCategory.create({...dto});
    // @ts-ignore
    product.options.push(createdCat._id)
    await product.save();
    return createdCat
  }

  async createOptionItem(dto: ProductOptionItemDto): Promise<ProductOptionItem> {
    const category = await this.productOptionCategory.findById(dto.optionCategory)
    const createdOption = await this.productOptionItem.create({...dto});
    // @ts-ignore
    category.options.push(createdOption._id)
    await category.save();
    return createdOption
  }
}
