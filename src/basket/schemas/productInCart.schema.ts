import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import mongoose from 'mongoose';
import {Order} from "./order.schema";
import {ProductOptionCategory} from "../../product/schemas/productOptionCategory.schema";

export type ProductInCartDocument = HydratedDocument<ProductInCart>;

class SelectedOption {
  @Prop({ required: true })
  optionCatName: string


}

@Schema()
export class ProductInCart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  orderId: Order;

  @Prop({ required: true })
  price: number;

  @Prop({ type: () => [SelectedOption], _id: false })
  selectedOptions: SelectedOption[];

}

export const ProductInCartSchema = SchemaFactory.createForClass(ProductInCart);
