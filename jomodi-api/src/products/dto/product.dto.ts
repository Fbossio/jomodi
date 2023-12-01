import { Expose } from 'class-transformer';

export class ProductDto {
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
  categoryId: number;
  @Expose()
  categoryName: string;
}
