import { ObjectId } from "mongoose";


export class CreateProductOptionItemDto {
  title: string
  productArticul: string
  price: number
  preview: string
  image: string
  optionCategoryID: ObjectId
}