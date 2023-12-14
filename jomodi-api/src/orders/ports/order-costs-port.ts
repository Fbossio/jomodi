import { CreateOrderCostsDto } from '../dto/create-order-costs.dto';
import { UpdateOrderCostsDto } from '../dto/update-order-costs.dto';
import { OrderCosts } from '../entities/order-costs.entity';

export interface OrderCostsPort {
  create(orderCosts: CreateOrderCostsDto): Promise<OrderCosts>;
  findOne(id: string): Promise<OrderCosts>;
  update(id: string, orderCosts: UpdateOrderCostsDto): Promise<OrderCosts>;
  remove(id: string): Promise<OrderCosts>;
}
