import mongoose, { Model, Types } from "mongoose";
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from "./dto/product.dto";
import { Product, ProductDocument } from "./schemas/product.schema";


@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: Omit<ProductDto, "_id">): Promise<Product> {
    const createdCat = new this.productModel(createProductDto);
    return createdCat.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findById(id: mongoose.Schema.Types.ObjectId): Promise<Product> | null {
    return this.productModel.findById(id)
  }
}
