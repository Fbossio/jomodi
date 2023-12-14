import { Order } from '../entities/order.entity';

export class CreateOrderCostsDto {
  subtotal: number;
  shippingCost: number;
  tax: number;
  totalCost: number;
  order: Order;
  orderId: number;
}
