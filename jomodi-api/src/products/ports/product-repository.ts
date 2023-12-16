import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

export interface ProductRepository {
  create(product: CreateProductDto): Promise<Product>;
  findAll(): Promise<Product[]>;
  paginate(options: IPaginationOptions): Promise<Pagination<Product>>;
  findOne(id: string): Promise<Product>;
  update(id: string, product: UpdateProductDto): Promise<Product>;
  remove(id: string): Promise<Product>;
  productsByCategory(categoryId: string): Promise<Product[]>;
  subtractStock(productId: string, quantity: number): Promise<void>;
}
