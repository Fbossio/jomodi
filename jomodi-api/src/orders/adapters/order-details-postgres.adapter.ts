import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDetailsDto } from '../dto/create-order-details.dto';
import { OrderDetails } from '../entities/order-details.entity';
import { OrderDetailsEntity } from '../schemas/order.details.schema';

@Injectable()
export class OrderDetailsPostgresAdapter {
  constructor(
    @InjectRepository(OrderDetailsEntity)
    private readonly orderDetailsEntity: Repository<OrderDetailsEntity>,
  ) {}

  async create(orderDetails: CreateOrderDetailsDto): Promise<OrderDetails> {
    const createdOrderDetails = this.orderDetailsEntity.create(orderDetails);
    try {
      await this.orderDetailsEntity.save(createdOrderDetails);
      return new OrderDetails(createdOrderDetails as any);
    } catch (error) {
      throw error;
    }
  }

  async findByOrderId(orderId: string): Promise<OrderDetails[]> {
    try {
      const orderDetails = await this.orderDetailsEntity.find({
        relations: ['order', 'product'],
        where: {
          order: { id: Number(orderId) },
        },
      });
      return orderDetails.map((orderDetail) => new OrderDetails(orderDetail));
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<OrderDetails[]> {
    const details = await this.findByOrderId(id);
    try {
      details.forEach(
        async (detail) => await this.orderDetailsEntity.delete(detail.id),
      );
      return details;
    } catch (error) {
      throw error;
    }
  }
}
