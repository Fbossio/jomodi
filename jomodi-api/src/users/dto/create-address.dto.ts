import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateAddressDto {
  @IsOptional()
  @IsNumber()
  userId?: number;
  @IsOptional()
  user?: User;
  @ApiProperty({ example: '1014 S Main St' })
  @IsString()
  address: string;
  @ApiProperty({ example: '	Las Cruces' })
  @IsString()
  city: string;
  @ApiProperty({ example: '88005' })
  @IsString()
  zip: string;
  @IsString()
  country: string;
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
