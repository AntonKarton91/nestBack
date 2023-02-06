import {forwardRef, Module} from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import {UserModule} from "../user/user.module";
import {MongooseModule} from "@nestjs/mongoose";
import {Basket, BasketSchema} from "./schemas/basket.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Basket.name, schema: BasketSchema}]),
    forwardRef(()=>UserModule)
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [
    BasketService,
  ]
})
export class BasketModule {}
