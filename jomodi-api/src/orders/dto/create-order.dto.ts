import { User } from '../../users/entities/user.entity';
import { OrderStatus } from '../entities/order.entity';
import { CreateOrderDetailsDto } from './create-order-details.dto';

export class CreateOrderDto {
  status?: OrderStatus;
  userId?: string;
  user?: User;
  details: CreateOrderDetailsDto[];
}
