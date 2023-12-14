import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderCostsDto } from './create-order-costs.dto';

export class UpdateOrderCostsDto extends PartialType(CreateOrderCostsDto) {}
