import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schemas/product.schema";
import { ProductOption, ProductOptionSchema } from "./schemas/productOptionCategory.schema";
import { ProductService } from "./product.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
    MongooseModule.forFeature([{name: ProductOption.name, schema: ProductOptionSchema}]),
  ],
  controllers: [ProductController],
  providers: [ConfigService, ProductService]

})
export class ProductModule {}
