import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../../products/products.service';
import { UsersService } from '../../users/users.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderDetails } from '../entities/order-details.entity';
import { Order } from '../entities/order.entity';
import { OrderRepository } from '../ports/order-port';
import { OrderEntity } from '../schemas/order.schema';
import { OrderDetailsPostgresAdapter } from './order-details-postgres.adapter';

@Injectable()
export class OrderPostgresAdapter implements OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly orderDetailsAdapter: OrderDetailsPostgresAdapter,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}
  async create(order: CreateOrderDto): Promise<Order> {
    const { details, ...otherData } = order;
    const orderObject = { ...otherData };
    const user = await this.usersService.findOne(order.userId);
    orderObject.user = user;
    const createdOrder = this.orderRepository.create(orderObject);

    try {
      const orderSaved = await this.orderRepository.save(createdOrder);
      const order = await this.findOne(orderSaved.id.toString());
      const orderDetails = await Promise.all(
        details.map(async (detail) => {
          const product = await this.productsService.findOne(
            detail.productId.toString(),
          );
          detail.product = product;
          detail.order = order;
          detail.price = Number(product.price);
          return await this.orderDetailsAdapter.create(detail);
        }),
      );

      const orderCreated = new Order(createdOrder);
      orderCreated.total = this.getTotal(orderDetails);

      // return this.serializeOrder(orderCreated, orderDetails);
      return { ...orderCreated, details: orderDetails };
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.find({
        relations: ['user'],
      });
      const ordersDetails = await Promise.all(
        orders.map(async (order) => {
          const details = await this.orderDetailsAdapter.findByOrderId(
            order.id.toString(),
          );
          const orderCreated = new Order(order);
          return { ...orderCreated, details };
        }),
      );
      return ordersDetails;
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
      const orderId = order.id;
      const details = await this.orderDetailsAdapter.findByOrderId(
        orderId.toString(),
      );
      const orderCreated = new Order(order);
      // return this.serializeOrder(orderCreated, details);
      return { ...orderCreated, details };
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
      const orderId = updatedOrder.id;
      const details = await this.orderDetailsAdapter.findByOrderId(
        orderId.toString(),
      );
      const orderCreated = new Order(updatedOrder);
      return { ...orderCreated, details };
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
      const orderId = order.id;
      const details = await this.orderDetailsAdapter.findByOrderId(
        orderId.toString(),
      );
      const orderCreated = new Order(order);
      await this.orderDetailsAdapter.remove(orderId.toString());
      await this.orderRepository.delete(id);
      return { ...orderCreated, details };
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

  private getTotal(details: OrderDetails[]) {
    return details.reduce((total, detail) => {
      return total + detail.price * detail.quantity;
    }, 0);
  }
}
