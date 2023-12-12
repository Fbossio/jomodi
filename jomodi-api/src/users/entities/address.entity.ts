import { User } from './user.entity';

export class Address {
  id: number;
  user?: User;
  userId: number;
  address: string;
  city: string;
  zip: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(address: Partial<Address>) {
    Object.assign(this, address);
  }
}
