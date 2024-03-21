import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { OrderStatus } from '../entities/order.entity';
import { CreateOrderDetailsDto } from './create-order-details.dto';

export class CreateOrderDto {
  @IsOptional()
  status?: OrderStatus;
  @ApiProperty({ example: '5' })
  @IsOptional()
  @IsString()
  userId?: string;
  @IsOptional()
  user?: User;
  @ApiProperty({
    example: [
      {
        quantity: 2,
        price: 100,
        productId: 1,
      },
    ],
  })
  @IsArray()
  details: CreateOrderDetailsDto[];
}
