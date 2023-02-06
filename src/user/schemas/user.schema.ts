import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument, ObjectId} from 'mongoose';
import mongoose from "mongoose";
import {Basket} from "../../basket/schemas/basket.schema";

export enum UserRoleType  {
    "ADMIN"="Administrator",
    "CUSTOMER"="Customer",
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string

    @Prop({required: true})
    role: UserRoleType

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Basket'})
    basketId: Basket;
}

export const UserSchema = SchemaFactory.createForClass(User);
