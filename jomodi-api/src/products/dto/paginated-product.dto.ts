import { Expose } from 'class-transformer';

export class ProductItemDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  description: string;
  @Expose()
  imageUrl?: string;
  @Expose()
  price: string;
  @Expose()
  stock: number;
  @Expose()
  categoryId: number;
  @Expose()
  categoryName: string;
}

export class PaginatedProductDto {
  @Expose()
  items: ProductItemDto[];

  @Expose()
  meta: any;
}
