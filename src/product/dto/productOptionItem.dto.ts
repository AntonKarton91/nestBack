import { ObjectId } from "mongoose";


export class ProductOptionItemDto {
  title: string
  price: number
  preview: string
  // image: string
  optionCategory: ObjectId
}