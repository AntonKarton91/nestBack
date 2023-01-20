import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UploadedFiles, UseInterceptors
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ProductService } from "./product.service";
import { ObjectId } from "mongoose";

import {FileFieldsInterceptor, FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {CreateProductDto} from "./dto/createProduct.dto";
import {CreateProductOptionCategoryDto} from "./dto/createProductOptionCategory.dto";
import {CreateProductOptionItemDto} from "./dto/createProductOptionItem.dto";


@Controller('/product')
export class ProductController {
  constructor(
    private readonly configService: ConfigService,
    private productService: ProductService
  ) {}

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.create(dto)
  }

  @Get()
  getAllProduct() {
    return this.productService.findAll()
  }

  @Get(":id")
  getOne(@Param("id") id: ObjectId) {
    return this.productService.findById(id)
  }


  @Put(":id")
  updateProduct(@Param () id: ObjectId, @Body() dto: CreateProductDto) {

  }

  @Delete(":id")
  deleteProduct(@Param() id: ObjectId) {

  }

  @Post("/optioncat")
  createProductOptionCategory(@Body() dto: CreateProductOptionCategoryDto) {
    return this.productService.createOptionCat(dto)
  }

  @Post("/optionitem")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'preview', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]))
  uploadFile(
      @UploadedFiles() files: { image?: Express.Multer.File[], preview?: Express.Multer.File[] },
      @Body () dto: CreateProductOptionItemDto) {
    const {image, preview} = files
    return this.productService.createOptionItem(dto, image[0], preview[0])
  }
}
