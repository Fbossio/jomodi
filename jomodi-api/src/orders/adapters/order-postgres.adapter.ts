import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';
import { OrderRepository } from '../ports/order-port';
import { OrderEntity } from '../schemas/order.schema';

@Injectable()
export class OrderPostgresAdapter implements OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}
  async create(order: CreateOrderDto): Promise<Order> {
    const createdOrder = this.orderRepository.create(order);

    try {
      await this.orderRepository.save(createdOrder);
      return new Order(createdOrder);
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.find({
        relations: ['user'],
      });
      return orders.map((order) => new Order(order));
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        relations: ['user'],
        where: { id: Number(id) },
      });
      return new Order(order);
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, order: UpdateOrderDto): Promise<Order> {
    try {
      await this.orderRepository.update(id, order);
      const updatedOrder = await this.orderRepository.findOne({
        relations: ['user'],
        where: { id: Number(id) },
      });
      return new Order(updatedOrder);
    } catch (error) {
      throw error;
    }
  }
  async remove(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        relations: ['user'],
        where: { id: Number(id) },
      });
      await this.orderRepository.delete(id);
      return new Order(order);
    } catch (error) {
      throw error;
    }
  }
  async ordersByUser(userId: string): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.find({
        relations: ['user'],
        where: { user: { id: Number(userId) } },
      });
      return orders.map((order) => new Order(order));
    } catch (error) {
      throw error;
    }
  }
}
