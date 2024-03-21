import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../../category/entities/category.entity';

export class CreateProductDto {
  @ApiProperty({ example: 'Product Name' })
  @IsString()
  name: string;
  @ApiProperty({ example: 'Product Description' })
  @IsOptional()
  @IsString()
  description?: string;
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
  @ApiProperty({ example: '100.00' })
  @IsString()
  price: string;
  @ApiProperty({ example: '5' })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  stock: number;
  @ApiProperty({ example: '5' })
  @IsString()
  categoryId: number;
  @IsOptional()
  category?: Category;
}
