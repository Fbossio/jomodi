import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderPostgresAdapter } from './adapters/order-postgres.adapter';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderEntity } from './schemas/order.schema';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'OrderRepository',
      useClass: OrderPostgresAdapter,
    },
  ],
})
export class OrdersModule {}
