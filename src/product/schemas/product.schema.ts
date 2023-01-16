import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import { ProductOptionCategory } from "./productOptionCategory.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  defaultPrice: number;

  @Prop()
  categories: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "ProductOptionCategory"})
  options: ProductOptionCategory[]

}

export const ProductSchema = SchemaFactory.createForClass(Product);

