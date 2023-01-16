import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProductOption } from "./productOption.schema";
import { Product } from "./product.schema";


export type ProductOptionCategoryDocument = HydratedDocument<ProductOptionCategory>;


@Schema()
export class ProductOptionCategory {
  @Prop()
  title: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProductOption'}]})
  options: ProductOption[];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
  product: Product;


}

export const ProductOptionCategorySchema = SchemaFactory.createForClass(ProductOptionCategory);

