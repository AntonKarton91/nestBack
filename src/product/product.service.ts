import mongoose, { Model, Types } from "mongoose";
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from "./schemas/product.schema";
import {ProductOptionCategory, ProductOptionCategoryDocument} from "./schemas/productOptionCategory.schema";
import {ProductOptionItem, ProductOptionItemDocument} from "./schemas/productOptionItem.schema";
import {FileService, FileType} from "../file/file.service";
import {CreateProductDto} from "./dto/createProduct.dto";
import {CreateProductOptionCategoryDto} from "./dto/createProductOptionCategory.dto";
import {CreateProductOptionItemDto} from "./dto/createProductOptionItem.dto";


@Injectable()
export class ProductService {
  constructor(
      @InjectModel(Product.name) private productModel: Model<ProductDocument>,
      @InjectModel(ProductOptionCategory.name) private productOptionCategory: Model<ProductOptionCategoryDocument>,
      @InjectModel(ProductOptionItem.name) private productOptionItem: Model<ProductOptionItemDocument>,
      private fileService: FileService
  ) {
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const createdProduct = await this.productModel.create(dto);
    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findById(id: mongoose.Schema.Types.ObjectId): Promise<Product> | null {
    const product = this.productModel.findById(id).populate({
      path: "optionCategories",
      populate: {
        path: "optionItems"
      }
    })
    return product
  }

  async createOptionCat(dto: CreateProductOptionCategoryDto): Promise<ProductOptionCategory> {
    const product = await this.productModel.findById(dto.product);
    if (!product) {
      throw new HttpException('Нет такого продукта', HttpStatus.BAD_REQUEST)
    }
    const optionCategory = await this.productOptionCategory.create({...dto})
    //@ts-ignore
    product.optionCategories.push(optionCategory._id)
    await product.save();
    return optionCategory;
  }

  async createOptionItem(dto: CreateProductOptionItemDto, image, preview) {
    const {productArticul, title} = dto
    const img = this.fileService.createFile(FileType.Image, image, productArticul, title)
    const dir = img[1]
    const prev = this.fileService.createFile(FileType.Preview, preview, productArticul, title, dir)
    const createdOption = await this.productOptionItem.create({...dto, preview: prev[0], image: img[0]});

    const optionCategory = await this.productOptionCategory.findById(dto.optionCategoryID)
    if (!optionCategory) {
      throw new HttpException('Нет такой категории', HttpStatus.BAD_REQUEST)
    }
    //@ts-ignore
    optionCategory.optionItems.push(createdOption._id)
    await optionCategory.save();

    return createdOption
  }


}

