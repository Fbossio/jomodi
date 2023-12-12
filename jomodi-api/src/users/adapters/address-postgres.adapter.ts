import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update.address.dto';
import { Address } from '../entities/address.entity';
import { AddressRepository } from '../ports/address-repository';
import { AddressEntity } from '../schemas/address.schema';

@Injectable()
export class AddressPostgresAdapter implements AddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}
  async findOne(id: string): Promise<Address> {
    try {
      const address = await this.addressRepository.findOne({
        where: { id: Number(id) },
      });
      return new Address(address);
    } catch (error) {
      throw error;
    }
  }
  async create(address: CreateAddressDto): Promise<Address> {
    const createdAddress = this.addressRepository.create(address);
    try {
      await this.addressRepository.save(createdAddress);
      return new Address(createdAddress);
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, address: UpdateAddressDto): Promise<Address> {
    try {
      await this.addressRepository.update(id, address);
      const updatedAddress = await this.addressRepository.findOne({
        where: { id: Number(id) },
      });
      return new Address(updatedAddress);
    } catch (error) {
      throw error;
    }
  }
  async remove(id: string): Promise<Address> {
    try {
      const address = await this.addressRepository.findOne({
        where: { id: Number(id) },
      });
      await this.addressRepository.remove(address);
      return new Address(address);
    } catch (error) {
      throw error;
    }
  }
  async findByUser(userId: string): Promise<Address[]> {
    try {
      const addresses = await this.addressRepository.find({
        relations: ['user'],
        where: { user: { id: Number(userId) } },
      });
      return addresses.map((address) => new Address(address));
    } catch (error) {
      throw error;
    }
  }

  async changeDefaultAddress(
    userId: string,
    addressId: string,
  ): Promise<Address> {
    try {
      const addresses = await this.addressRepository.find({
        relations: ['user'],
        where: { user: { id: Number(userId) } },
      });
      for (const address of addresses) {
        address.isDefault = address.id === Number(addressId);
        await this.addressRepository.save(address);
      }
      const updatedAddress = await this.addressRepository.findOne({
        where: { id: Number(addressId) },
      });
      return new Address(updatedAddress);
    } catch (error) {
      throw error;
    }
  }
}
