import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update.address.dto';
import { Address } from './entities/address.entity';
import { AddressRepository } from './ports/address-repository';
import { UsersService } from './users.service';

@Injectable()
export class AddressService {
  constructor(
    @Inject('AddressRepository')
    private readonly addressRepository: AddressRepository,
    @Inject(UsersService) private UsersService: UsersService,
  ) {}

  async create(userId: string, address: CreateAddressDto): Promise<Address> {
    const user = await this.UsersService.findOne(userId);
    address.userId = Number(userId);
    address.user = user;

    // check if user has any addresses
    const addresses = await this.addressRepository.findByUser(
      address.userId.toString(),
    );
    addresses.length > 0
      ? (address.isDefault = false)
      : (address.isDefault = true);
    return await this.addressRepository.create(address);
  }

  async findOne(id: string): Promise<Address> {
    return await this.addressRepository.findOne(id);
  }

  async findByUser(userId: string): Promise<Address[]> {
    return await this.addressRepository.findByUser(userId);
  }

  async update(id: string, address: UpdateAddressDto): Promise<Address> {
    return await this.addressRepository.update(id, address);
  }

  async changeDefaultAddress(id: string, addressId: string): Promise<Address> {
    return await this.addressRepository.changeDefaultAddress(id, addressId);
  }

  async remove(id: string): Promise<Address> {
    const address = await this.addressRepository.findOne(id);
    if (address.isDefault) {
      throw new BadRequestException('Cannot delete default address');
    }
    return await this.addressRepository.remove(id);
  }
}
