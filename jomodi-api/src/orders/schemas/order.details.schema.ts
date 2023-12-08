import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '../../products/schemas/products.schema';
import { OrderEntity } from './order.schema';

@Entity()
export class OrderDetailsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  quantity: number;
  @Column({ type: 'real' })
  price: number;
  @ManyToOne(() => OrderEntity, (order) => order.orderDetails)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;
  @ManyToOne(() => ProductEntity, (product) => product.orderDetails)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedAt: Date;
}
