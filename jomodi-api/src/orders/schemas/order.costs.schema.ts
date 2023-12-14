import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.schema';

@Entity()
export class OrderCostsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'real' })
  subtotal: number;
  @Column({ type: 'real' })
  shippingCost: number;
  @Column({ type: 'real' })
  tax: number;
  @Column({ type: 'real' })
  totalCost: number;
  @OneToOne(() => OrderEntity, (order) => order.orderCosts)
  order: OrderEntity;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedAt: Date;
}
