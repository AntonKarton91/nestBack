import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import {User} from "../../user/schemas/user.schema";

export type BasketDocument = HydratedDocument<Basket>;

@Schema()
export class Basket {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userId: User;

    // @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]})
    // optionItems: Order[];
}

export const BasketSchema = SchemaFactory.createForClass(Basket);
