import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiskImageHandlerAdapter } from '../common/adapters/disk-image-handler-adapter';
import { UuidService } from '../common/uuid.service';
import { StringFormatter } from '../utils/string-formatter';
import { ProductPostgresAdapter } from './adapters/product-postgres.adapter';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductEntity } from './schemas/products.schema';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    StringFormatter,
    UuidService,
    {
      provide: 'ImageStoragePort',
      useClass: DiskImageHandlerAdapter,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductPostgresAdapter,
    },
  ],
})
export class ProductsModule {}
