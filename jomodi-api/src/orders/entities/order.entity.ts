import { User } from '../../users/entities/user.entity';

export class Order {
  id: number;
  status: OrderStatus;
  userId: number;
  user?: User;
  costs: any;
  details: any;
  billingAddress: any;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(order: Partial<Order>) {
    Object.assign(this, order);
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
  }
}

export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DELIVERED = 'delivered',
}
