import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import { ProductOptionCategory } from "./productOptionCategory.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({required: true, unique: true})
  title: string;

  @Prop({required: true, unique: true})
  articul:string

  @Prop()
  description: string;

  @Prop()
  defaultPrice: number;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProductOptionCategory'}]})
  optionCategories: ProductOptionCategory[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

