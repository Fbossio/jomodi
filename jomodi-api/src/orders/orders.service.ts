import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './ports/order-port';
import { OrderSerializerPort } from './ports/order-serializer-port';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('OrderRepository')
    private readonly orserRepository: OrderRepository,
    @Inject('OrderSerializerPort')
    private readonly orderSerializer: OrderSerializerPort,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orserRepository.create(createOrderDto);
    return this.orderSerializer.serializeOrder(order);
  }

  async findAll() {
    const orders = await this.orserRepository.findAll();
    return orders.map((order) => this.orderSerializer.serializeOrder(order));
  }

  async findOne(id: string) {
    const order = await this.orserRepository.findOne(id);
    return this.orderSerializer.serializeOrder(order);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orserRepository.update(id, updateOrderDto);
    return this.orderSerializer.serializeOrder(order);
  }

  async remove(id: string) {
    const order = await this.orserRepository.remove(id);
    return this.orderSerializer.serializeOrder(order);
  }
}
