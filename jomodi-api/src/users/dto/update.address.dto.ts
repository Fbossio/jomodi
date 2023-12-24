import { IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  address: string;
  @IsString()
  city: string;
  @IsString()
  zip: string;
  @IsString()
  country: string;
}
