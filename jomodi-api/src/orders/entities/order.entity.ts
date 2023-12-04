import { User } from '../../users/entities/user.entity';

export class Order {
  id: number;
  status: OrderStatus;
  userId: number;
  user?: User;

  constructor(order: Partial<Order>) {
    Object.assign(this, order);
  }
}

export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DELIVERED = 'delivered',
}
