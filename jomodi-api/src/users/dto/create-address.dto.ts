import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateAddressDto {
  @IsNumber()
  userId: number;
  @IsOptional()
  user?: User;
  @IsString()
  address: string;
  @IsString()
  city: string;
  @IsString()
  zip: string;
  @IsString()
  country: string;
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
