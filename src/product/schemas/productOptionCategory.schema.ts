import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {ProductOptionItem} from "./productOptionItem.schema";
import { Product } from "./product.schema";


export type ProductOptionCategoryDocument = HydratedDocument<ProductOptionCategory>;


@Schema()
export class ProductOptionCategory {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  productArticul: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
  product: Product;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProductOptionItem'}]})
  optionItems: ProductOptionItem[];
}

export const ProductOptionCategorySchema = SchemaFactory.createForClass(ProductOptionCategory);

