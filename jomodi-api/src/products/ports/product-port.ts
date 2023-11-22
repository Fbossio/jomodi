import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

export interface ProductRepository {
  create(product: CreateProductDto): Promise<Product>;
  findAll(): Promise<Product[]>;
  findOne(id: string): Promise<Product>;
  update(id: string, product: UpdateProductDto): Promise<Product>;
  remove(id: string): Promise<Product>;
}
