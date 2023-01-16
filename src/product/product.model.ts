export class ProductModel {
  title: string
  description: string
  defaultPrice: number
  oldPrice: number
  categories: string[]
  options?: {title: string, preview: string, img: string, price: number}[]
  accessories?: {title: string, description: string, price: string}[] //Фурнитура

}
