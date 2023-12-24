import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../../category/entities/category.entity';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsString()
  imageUrl?: string;
  @IsString()
  price: string;
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  stock: number;
  @IsString()
  categoryId: string;
  @IsOptional()
  category?: Category;
}
