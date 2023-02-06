import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import mongoose from 'mongoose';
import { DeliveryMethod, IDeliveryAddress } from '../dto/createOrder.dto';
import { Basket } from './basket.schema';
import {ProductInCart} from "./productInCart.schema";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Basket' })
  basketId: Basket;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductInCart' }],
    required: true,
  })
  products: ProductInCart[];

  @Prop({ required: true })
  fullPrice: number;

  @Prop()
  deliveryMethod: DeliveryMethod;

  @Prop()
  deliveryAddress: IDeliveryAddress;

}

export const OrderSchema = SchemaFactory.createForClass(Order);
