import { User } from '../../users/entities/user.entity';

export class Order {
  id: number;
  status: OrderStatus;
  userId: number;
  user?: User;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(order: Partial<Order>) {
    Object.assign(this, order);
    this.userFirstName = order.user.firstName;
    this.userLastName = order.user.lastName;
    this.userEmail = order.user.email;
    this.userId = order.user.id;
  }
}

export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DELIVERED = 'delivered',
}
