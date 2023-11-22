export class CreateProductDto {
  name: string;
  description?: string;
  imageUrl?: string;
  price: string;
  categoryId: number;
}
