import { IsArray, IsOptional, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { OrderStatus } from '../entities/order.entity';
import { CreateOrderDetailsDto } from './create-order-details.dto';

export class CreateOrderDto {
  @IsOptional()
  status?: OrderStatus;
  @IsOptional()
  @IsString()
  userId?: string;
  @IsOptional()
  user?: User;
  @IsArray()
  details: CreateOrderDetailsDto[];
}
