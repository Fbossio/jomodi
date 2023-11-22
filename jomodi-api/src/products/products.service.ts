import { Inject, Injectable } from '@nestjs/common';
import { ImageStoragePort } from '../common/ports/image-storage';
import { StringFormatter } from '../utils/string-formatter';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './ports/product-port';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ImageStoragePort')
    private readonly imageStoragePort: ImageStoragePort,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    private readonly stringFormatter: StringFormatter,
  ) {}
  async uploadImage(
    name: string,
    image: Buffer,
    mimeType: string,
  ): Promise<string> {
    const formattedName = this.stringFormatter.fileNameFormat(name);
    const namePrefix = 'product-';
    const savedImage = await this.imageStoragePort.save(
      formattedName,
      image,
      mimeType,
      namePrefix,
    );
    return savedImage;
  }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = await this.productRepository.create(
      createProductDto,
    );
    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    const imageName = this.stringFormatter.extractSubstring(
      product.imageUrl,
      'product',
    );
    await this.imageStoragePort.remove(imageName);
    return this.productRepository.remove(id);
  }
}