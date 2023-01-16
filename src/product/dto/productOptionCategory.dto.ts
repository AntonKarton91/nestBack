import { ObjectId } from "mongoose";

export class ProductOptionCategoryDto {
  title: string
  product: ObjectId
}