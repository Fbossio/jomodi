import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../ports/product-port';
import { ProductEntity } from '../schemas/products.schema';

export class ProductPostgresAdapter implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    const createdProduct = this.productRepository.create(product);
    try {
      await this.productRepository.save(createdProduct);
      return new Product(createdProduct);
    } catch (error) {
      Promise.reject(error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productRepository.find();
      return products.map((product) => new Product(product));
    } catch (error) {
      Promise.reject(error);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: Number(id) },
      });
      return new Product(product);
    } catch (error) {
      Promise.reject(error);
    }
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    try {
      await this.productRepository.update(id, product);
      const updatedProduct = await this.productRepository.findOne({
        where: { id: Number(id) },
      });
      return new Product(updatedProduct);
    } catch (error) {
      Promise.reject(error);
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: Number(id) },
      });
      await this.productRepository.remove(product);
      return new Product(product);
    } catch (error) {
      Promise.reject(error);
    }
  }
}
