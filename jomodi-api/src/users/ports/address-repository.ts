import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update.address.dto';
import { Address } from '../entities/address.entity';

export interface AddressRepository {
  findOne(id: string): Promise<Address>;
  create(address: CreateAddressDto): Promise<Address>;
  update(id: string, address: UpdateAddressDto): Promise<Address>;
  remove(id: string): Promise<Address>;
  findByUser(userId: string): Promise<Address[]>;
  changeDefaultAddress(userId: string, addressId: string): Promise<Address>;
}
