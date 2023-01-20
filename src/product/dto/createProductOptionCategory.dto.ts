import { ObjectId } from "mongoose";

export class CreateProductOptionCategoryDto {
  title: string
  productArticul: string
  product: ObjectId
}