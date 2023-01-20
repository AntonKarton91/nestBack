import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schemas/product.schema";
import {ProductOptionCategory, ProductOptionCategorySchema,} from "./schemas/productOptionCategory.schema";
import { ProductService } from "./product.service";
import {ProductOptionItem, ProductOptionItemSchema} from "./schemas/productOptionItem.schema";
import {FileService} from "../file/file.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
    MongooseModule.forFeature([{name: ProductOptionCategory.name, schema: ProductOptionCategorySchema}]),
    MongooseModule.forFeature([{name: ProductOptionItem.name, schema: ProductOptionItemSchema}]),
  ],
  controllers: [ProductController],
  providers: [ConfigService, ProductService, FileService]

})
export class ProductModule {}
