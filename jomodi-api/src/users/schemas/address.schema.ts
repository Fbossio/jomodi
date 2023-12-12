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
import { UserEntity } from './users.schema';

@Entity()
export class AddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  address: string;
  @Column()
  city: string;
  @Column()
  zip: string;
  @Column()
  country: string;
  @Column()
  isDefault: boolean;
  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedAt: Date;
}
