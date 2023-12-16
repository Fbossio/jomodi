import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../ports/product-repository';
import { ProductEntity } from '../schemas/products.schema';

@Injectable()
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
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productRepository.find({
        relations: ['category'],
      });
      return products.map((product) => new Product(product));
    } catch (error) {
      throw error;
    }
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Product>> {
    try {
      const queryBuilder = this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .orderBy('product.createdAt', 'DESC');
      const paginatedProducts = await paginate<ProductEntity>(
        queryBuilder,
        options,
      );

      return new Pagination(
        paginatedProducts.items.map((product) => new Product(product)),
        paginatedProducts.meta,
        paginatedProducts.links,
      );
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        relations: ['category'],
        where: { id: Number(id) },
      });
      return new Product(product);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    try {
      await this.productRepository.update(id, product);
      const updatedProduct = await this.productRepository.findOne({
        relations: ['category'],
        where: { id: Number(id) },
      });
      return new Product(updatedProduct);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        relations: ['category'],
        where: { id: Number(id) },
      });
      await this.productRepository.remove(product);
      return new Product(product);
    } catch (error) {
      throw error;
    }
  }

  async productsByCategory(categoryId: string): Promise<Product[]> {
    try {
      const products = await this.productRepository.find({
        relations: ['category'],
        where: { category: { id: Number(categoryId) } },
      });
      return products.map((product) => new Product(product));
    } catch (error) {
      throw error;
    }
  }

  async subtractStock(id: string, quantity: number): Promise<void> {
    try {
      const product = await this.findOne(id);
      const stock = product.getStock();
      if (stock > quantity) {
        this.update(id, { stock: stock - quantity });
      } else {
        throw new BadRequestException('Not enough stock');
      }
    } catch (error) {
      throw error;
    }
  }
}
