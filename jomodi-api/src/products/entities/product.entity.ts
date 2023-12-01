import { Category } from '../../category/entities/category.entity';

export class Product {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  price: string;
  category?: Category;
  categoryId: number;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(product: Partial<Product>) {
    Object.assign(this, product);
    this.categoryName = product.category.name;
    this.categoryId = product.category.id;
  }
}
