import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Basket, BasketDocument} from "./schemas/basket.schema";
import {CreateBasketDto} from "./dto/createBasket.dto";

@Injectable()
export class BasketService {
    constructor( @InjectModel(Basket.name) private basketModel: Model<BasketDocument>,) {}

    async create(dto: CreateBasketDto): Promise<Basket> {
        return this.basketModel.create(dto)
    }

}
