import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './ports/order-port';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('OrderRepository')
    private readonly orserRepository: OrderRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orserRepository.create(createOrderDto);
    return this.serializeOrder(order);
  }

  async findAll() {
    const orders = await this.orserRepository.findAll();
    return orders.map((order) => this.serializeOrder(order));
  }

  async findOne(id: string) {
    const order = await this.orserRepository.findOne(id);
    return this.serializeOrder(order);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orserRepository.update(id, updateOrderDto);
    return this.serializeOrder(order);
  }

  async remove(id: string) {
    const order = await this.orserRepository.remove(id);
    return this.serializeOrder(order);
  }

  private serializeOrder(order) {
    const { details, ...otherData } = order;
    const orderObject = { ...otherData };
    const serializedOrder = {
      data: {
        id: orderObject.id,
        status: orderObject.status,
        firstName: orderObject.firstName,
        lastName: orderObject.lastName,
        email: orderObject.email,
        details: [],
      },
    };
    const serializedDetails = details.map((detail) => {
      return {
        id: detail.id,
        quantity: detail.quantity,
        price: detail.price,
        product: detail.product.name,
      };
    });
    serializedOrder.data.details = serializedDetails;
    return serializedOrder;
  }
}
