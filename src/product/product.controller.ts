import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UploadedFile, UploadedFiles, UseInterceptors
} from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";
import { ConfigService } from "@nestjs/config";
import { ProductService } from "./product.service";
import { ObjectId } from "mongoose";
import {ProductOptionCategoryDto} from "./dto/productOptionCategory.dto";
import {ProductOptionItemDto} from "./dto/productOptionItem.dto";
import {FileFieldsInterceptor, FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";


@Controller('/product')
export class ProductController {
  constructor(
    private readonly configService: ConfigService,
    private productService: ProductService
  ) {}

  @Post()
  createProduct(@Body() dto: ProductDto) {
    return this.productService.create(dto)
  }

  @Get()
  getProduct() {
    return this.productService.findAll()
  }

  @Get(":id")
  getOne(@Param("id") id: ObjectId) {
    return this.productService.findById(id)
  }

  @Put(":id")
  updateProduct(@Param () id: ObjectId, @Body() dto: ProductDto) {

  }

  @Delete(":id")
  deleteProduct(@Param() id: ObjectId) {

  }

  @Post("/optioncat")
  createProductOptionCategory(@Body() dto: ProductOptionCategoryDto) {
    return this.productService.createOptionCat(dto)
  }

  @Post("/optionitem")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'preview', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]))
  uploadFile(@UploadedFiles() files: { image?: Express.Multer.File[], preview?: Express.Multer.File[] }) {
    console.log(files);

    return "hello"
    // return this.productService.createOptionItem(dto)
  }
}
