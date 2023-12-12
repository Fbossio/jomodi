import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnGuard } from '../auth/guards/own.guard';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { AddressService } from './address.service';
import { AddressDto } from './dto/address.dto';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
@Serialize(AddressDto)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  async create(
    @Param('userId') userId: string,
    @Body() address: CreateAddressDto,
  ) {
    return this.addressService.create(userId, address);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async findByUser(@Param('userId') userId: string) {
    return this.addressService.findByUser(userId);
  }

  @UseGuards(JwtAuthGuard, OwnGuard)
  @Put(':userId/addressId')
  async update(
    @Param('addressId') addressId: string,
    @Body() updateAddressDto: CreateAddressDto,
  ) {
    return this.addressService.update(addressId, updateAddressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/:addressId')
  async remove(@Param('addressId') addressId: string) {
    return this.addressService.remove(addressId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId/:addressId/default')
  async changeDefaultAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.addressService.changeDefaultAddress(userId, addressId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/default')
  async getDefaultAddress(@Param('userId') userId: string) {
    return this.addressService.getDefaultAddress(userId);
  }
}
