import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument, ObjectId} from 'mongoose';
import mongoose from "mongoose";
import { ProductOptionCategory } from "./productOptionCategory.schema";

export type ProductOptionItemDocument = HydratedDocument<ProductOptionItem>;


@Schema()
export class ProductOptionItem {
  @Prop({ required: true })
  title: string;

  @Prop()
  productArticul: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'ProductOptionCategory'})
  optionCategoryID: ProductOptionCategory;

  @Prop()
  price: number

  @Prop({ required: true })
  preview: string

  @Prop({ required: true })
  image: string
}

export const ProductOptionItemSchema = SchemaFactory.createForClass(ProductOptionItem);

