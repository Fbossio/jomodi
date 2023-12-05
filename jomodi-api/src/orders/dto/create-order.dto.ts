import { User } from '../../users/entities/user.entity';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  status: OrderStatus;
  userId?: string;
  user?: User;
}
