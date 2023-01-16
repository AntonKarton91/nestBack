import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";
import { ConfigService } from "@nestjs/config";
import { ProductService } from "./product.service";
import { ObjectId } from "mongoose";


@Controller('/product')
export class ProductController {
  constructor(
    private readonly configService: ConfigService,
    private productService: ProductService
  ) {}

  @Post('create')
  createProduct(@Body() dto: ProductDto) {
    return this.productService.create(dto)
  }

  @Get("getall")
  getProduct() {
    return this.productService.findAll()
  }

  @Get(":id")
  getOne(@Param("id") id: ObjectId) {
    return this.productService.findById(id)
  }

  @Put('put')
  updateProduct(@Body() dto: ProductDto) {

  }

  @Delete('create')
  deleteProduct(@Param() id: number) {

  }
}
