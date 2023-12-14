import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderCostsDto } from '../dto/create-order-costs.dto';
import { UpdateOrderCostsDto } from '../dto/update-order-costs.dto';
import { OrderCosts } from '../entities/order-costs.entity';
import { OrderCostsPort } from '../ports/order-costs-port';
import { OrderCostsEntity } from '../schemas/order.costs.schema';

@Injectable()
export class OrderCostsPostgresAdapter implements OrderCostsPort {
  constructor(
    @InjectRepository(OrderCostsEntity)
    private readonly orderCostsEntity: Repository<OrderCostsEntity>,
  ) {}
  async create(orderCosts: CreateOrderCostsDto): Promise<OrderCosts> {
    const createdOrderCosts = this.orderCostsEntity.create(orderCosts);
    try {
      await this.orderCostsEntity.save(createdOrderCosts);
      return new OrderCosts(createdOrderCosts as any);
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<OrderCosts> {
    try {
      const orderCosts = await this.orderCostsEntity.findOne({
        relations: ['order'],
        where: {
          order: { id: Number(id) },
        },
      });
      return new OrderCosts(orderCosts as any);
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: string,
    orderCosts: UpdateOrderCostsDto,
  ): Promise<OrderCosts> {
    const updatedOrderCosts = this.orderCostsEntity.create(orderCosts);
    try {
      await this.orderCostsEntity.update(id, updatedOrderCosts);
      return new OrderCosts(updatedOrderCosts as any);
    } catch (error) {
      throw error;
    }
  }
  async remove(id: string): Promise<OrderCosts> {
    const orderCosts = await this.findOne(id);
    try {
      await this.orderCostsEntity.delete(id);
      return orderCosts;
    } catch (error) {
      throw error;
    }
  }
}
