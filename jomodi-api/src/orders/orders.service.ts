import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './ports/order-port';
import { OrderSerializerPort } from './ports/order-serializer-port';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
    @Inject('OrderSerializerPort')
    private readonly orderSerializer: OrderSerializerPort,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.create(createOrderDto);
    return this.orderSerializer.serializeOrder(order);
  }

  async findAll() {
    const orders = await this.orderRepository.findAll();
    return orders.map((order) => this.orderSerializer.serializeOrder(order));
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne(id);
    return this.orderSerializer.serializeOrder(order);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.update(id, updateOrderDto);
    return this.orderSerializer.serializeOrder(order);
  }

  async remove(id: string) {
    const order = await this.orderRepository.remove(id);
    return this.orderSerializer.serializeOrder(order);
  }
}
