import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryPostgresAdapter } from './adapters/category-postgres.adapter';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity } from './schemas/category.schema';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: 'CategoryRepository',
      useClass: CategoryPostgresAdapter,
    },
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
