import { IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDetailsDto {
  @IsNumber()
  quantity: number;
  @IsOptional()
  @IsNumber()
  price?: number;
  @IsOptional()
  product?: any;
  @IsOptional()
  order?: any;
  @IsNumber()
  productId: number;
  @IsOptional()
  @IsNumber()
  orderId?: number;
}
