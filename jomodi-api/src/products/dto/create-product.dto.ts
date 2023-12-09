import { Category } from '../../category/entities/category.entity';

export class CreateProductDto {
  name: string;
  description?: string;
  imageUrl?: string;
  price: string;
  stock: number;
  categoryId: string;
  category?: Category;
}
