import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";

export enum UserRoleType  {
    "ADMIN"="Administrator",
    "CUSTOMER"="Customer",
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true})
    userName: string;

    @Prop({required: true, unique: true})
    userEmail: string;

    @Prop({required: true})
    userPassword: string

    @Prop({required: true})
    userRole: UserRoleType
}

export const UserSchema = SchemaFactory.createForClass(User);
