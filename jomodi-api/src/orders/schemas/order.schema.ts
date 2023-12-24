import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/schemas/users.schema';
import { OrderStatus } from '../entities/order.entity';
import { OrderCostsEntity } from './order.costs.schema';
import { OrderDetailsEntity } from './order.details.schema';

@Entity()
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: OrderStatus.PENDING })
  status: OrderStatus;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => OrderDetailsEntity, (orderDetails) => orderDetails.order, {
    cascade: ['remove'],
  })
  orderDetails: OrderDetailsEntity[];
  @OneToOne(() => OrderCostsEntity, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'orderCostsId' })
  orderCosts: OrderCostsEntity;

  @Column({ nullable: true })
  paymentId: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedAt: Date;
}
