import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { CategoryService } from '../category/category.service';
import { ImageStoragePort } from '../common/ports/image-storage';
import { StringFormatter } from '../common/string-formatter';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './ports/product-repository';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ImageStoragePort')
    private readonly imageStoragePort: ImageStoragePort,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    private readonly stringFormatter: StringFormatter,
    private readonly categoryService: CategoryService,
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
    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );
    if (category.id === undefined) {
      throw new BadRequestException('Category not found');
    }

    createProductDto.category = category;
    const createdProduct = await this.productRepository.create(
      createProductDto,
    );

    return createdProduct;
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Product>> {
    return this.productRepository.paginate(options);
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

  async productsByCategory(categoryId: string): Promise<Product[]> {
    return this.productRepository.productsByCategory(categoryId);
  }

  async subtractStock(productId: string, quantity: number): Promise<void> {
    await this.productRepository.subtractStock(productId, quantity);
  }
}
