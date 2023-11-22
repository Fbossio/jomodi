export class Product {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  price: string;
  categoryId: number;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(product: Partial<Product>) {
    Object.assign(this, product);
  }
}
