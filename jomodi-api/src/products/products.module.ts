import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { CommonModule } from '../common/common.module';
import { ProductPostgresAdapter } from './adapters/product-postgres.adapter';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductEntity } from './schemas/products.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    CategoryModule,
    CommonModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: 'ProductRepository',
      useClass: ProductPostgresAdapter,
    },
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
