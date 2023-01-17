import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import { ProductOptionCategory } from "./productOptionCategory.schema";

export type ProductOptionItemDocument = HydratedDocument<ProductOptionItem>;


@Schema()
export class ProductOptionItem {
  @Prop()
  title: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'ProductOptionCategory'})
  optionCategory: ProductOptionCategory;

  @Prop()
  price: number

  @Prop()
  preview: string

  @Prop()
  image: string
}

export const ProductOptionItemSchema = SchemaFactory.createForClass(ProductOptionItem);

