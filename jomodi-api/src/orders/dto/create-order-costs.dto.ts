import { IsNumber } from 'class-validator';
import { Order } from '../entities/order.entity';

export class CreateOrderCostsDto {
  @IsNumber()
  subtotal: number;
  @IsNumber()
  shippingCost: number;
  @IsNumber()
  tax: number;
  @IsNumber()
  totalCost: number;
  order: Order;
  @IsNumber()
  orderId: number;
}
