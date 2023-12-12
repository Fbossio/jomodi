import { User } from '../entities/user.entity';

export class CreateAddressDto {
  userId: number;
  user?: User;
  address: string;
  city: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}
