import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import { ProductOptionCategory } from "./productOptionCategory.schema";

export type ProductOptionDocument = HydratedDocument<ProductOption>;


@Schema()
export class ProductOption {
  @Prop()
  title: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProductOptionCategory'}]})
  options: ProductOptionCategory;

  @Prop()
  price: number

  @Prop()
  preview: string

  @Prop()
  image: string
}

export const ProductOptionSchema = SchemaFactory.createForClass(ProductOption);

