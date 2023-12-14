import { Order } from './order.entity';

export class OrderCosts {
  id: number;
  subtotal: number;
  shippingCost: number;
  tax: number;
  totalCost: number;
  order: Order;
  orderId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(orderCosts: Partial<OrderCosts>) {
    Object.assign(this, orderCosts);
  }
}
