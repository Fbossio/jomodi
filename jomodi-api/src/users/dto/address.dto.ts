import { Expose } from 'class-transformer';

export class AddressDto {
  @Expose()
  id: string;
  @Expose()
  address: string;
  @Expose()
  city: string;
  @Expose()
  zip: string;
  @Expose()
  country: string;
  @Expose()
  isDefault: string;
}
