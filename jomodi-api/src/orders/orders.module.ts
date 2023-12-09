import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { OrderDetailsPostgresAdapter } from './adapters/order-details-postgres.adapter';
import { OrderHelperPostgresAdapter } from './adapters/order-helper-postgres.adapter';
import { OrderPostgresAdapter } from './adapters/order-postgres.adapter';
import { OrderSerializerPostgresAdapter } from './adapters/order-serializer-postgres.adapter';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderDetailsEntity } from './schemas/order.details.schema';
import { OrderEntity } from './schemas/order.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderDetailsEntity]),
    UsersModule,
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'OrderRepository',
      useClass: OrderPostgresAdapter,
    },
    {
      provide: 'OrderSerializerPort',
      useClass: OrderSerializerPostgresAdapter,
    },
    {
      provide: 'OrderHelperPort',
      useClass: OrderHelperPostgresAdapter,
    },
    OrderDetailsPostgresAdapter,
  ],
})
export class OrdersModule {}
