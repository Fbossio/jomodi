import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './ports/order-port';

@Injectable()
export class OrdersService {
  constructor(private readonly orserRepository: OrderRepository) {}
  async create(createOrderDto: CreateOrderDto) {
    return await this.orserRepository.create(createOrderDto);
  }

  async findAll() {
    return await this.orserRepository.findAll();
  }

  async findOne(id: string) {
    return await this.orserRepository.findOne(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.orserRepository.update(id, updateOrderDto);
  }

  async remove(id: string) {
    return await this.orserRepository.remove(id);
  }
}
