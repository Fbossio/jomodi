import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';

export interface OrderRepository {
  create(order: CreateOrderDto): Promise<Order>;
  findAll(): Promise<Order[]>;
  findOne(id: string): Promise<Order>;
  update(id: string, order: UpdateOrderDto): Promise<Order>;
  updatePayment(id: string, paymentId: string): Promise<Order>;
  remove(id: string): Promise<Order>;
  ordersByUser(userId: string): Promise<Order[]>;
}
