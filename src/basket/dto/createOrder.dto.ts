import { ObjectId } from 'mongoose';
import exp from 'constants';

export enum DeliveryMethod {
  'AVITO' = 'avito',
  'POST' = 'post',
}

export interface IDeliveryAddress {
  city: string;
}

export class CreateOrderDto {
  basketId: ObjectId;
  products: ObjectId[];
  fullPrice: number;
  deliveryMethod?: DeliveryMethod;
  deliveryAddress?: IDeliveryAddress;
}