import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/ports/category-repository';
import { ImageStoragePort } from '../common/ports/image-storage';
import { StringFormatter } from '../common/string-formatter';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './ports/product-repository';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let mockImageStoragePort: jest.Mocked<ImageStoragePort>;
  let mockProductRepository: jest.Mocked<ProductRepository>;
  let mockStringFormatter: jest.Mocked<StringFormatter>;
  let mockCategoryRepository: jest.Mocked<CategoryRepository>;

  beforeEach(async () => {
    mockImageStoragePort = {
      save: jest.fn(),
      remove: jest.fn(),
    };

    mockProductRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      paginate: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      productsByCategory: jest.fn(),
      subtractStock: jest.fn(),
    };

    mockStringFormatter = {
      fileNameFormat: jest.fn(),
      extractSubstring: jest.fn(),
    };

    mockCategoryRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: 'ImageStoragePort',
          useValue: mockImageStoragePort,
        },
        {
          provide: 'ProductRepository',
          useValue: mockProductRepository,
        },
        {
          provide: StringFormatter,
          useValue: mockStringFormatter,
        },
        {
          provide: CategoryService,
          useFactory: () => new CategoryService(mockCategoryRepository),
        },
        {
          provide: 'CategoryRepository',
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    // Arrange
    const createProductDto: CreateProductDto = {
      name: 'Test Product',
      description: 'Testing product description',
      imageUrl: 'https://test.com/image.jpg',
      price: '15.99',
      stock: 10,
      categoryId: '1',
      category: {
        id: 1,
        name: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    const expectedProduct: Product = {
      id: 1,
      name: 'Test Product',
      description: 'https://test.com/image.jpg',
      price: '15.99',
      stock: 10,
      categoryId: 1,
      categoryName: 'Test Category',
      getStock() {
        return this.stock;
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(mockProductRepository, 'create')
      .mockResolvedValue(expectedProduct);

    // Act
    const result = await service.create(createProductDto);

    // Assert
    expect(result).toEqual(expectedProduct);
    expect(mockProductRepository.create).toHaveBeenCalledWith(createProductDto);
  });

  it('should find all products', async () => {
    // Arrange
    const expectedProducts: Product[] = [
      {
        id: 1,
        name: 'Test Product',
        description: 'https://test.com/image.jpg',
        price: '15.99',
        stock: 10,
        categoryId: 1,
        categoryName: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date(),
        getStock() {
          return this.stock;
        },
      },
    ];

    const options = {
      limit: 10,
      page: 1,
    };

    jest
      .spyOn(mockProductRepository, 'paginate')
      .mockResolvedValue(expectedProducts as any);

    // Act
    const result = await service.findAll(options);

    // Assert
    expect(result).toEqual(expectedProducts);
    expect(mockProductRepository.paginate).toHaveBeenCalledWith(options);
  });

  it('should find one product', async () => {
    // Arrange
    const expectedProduct: Product = {
      id: 1,
      name: 'Test Product',
      description: 'https://test.com/image.jpg',
      price: '15.99',
      stock: 10,
      categoryId: 1,
      categoryName: 'Test Category',
      createdAt: new Date(),
      updatedAt: new Date(),
      getStock() {
        return this.stock;
      },
    };

    jest
      .spyOn(mockProductRepository, 'findOne')
      .mockResolvedValue(expectedProduct);

    // Act
    const result = await service.findOne('1');

    // Assert
    expect(result).toEqual(expectedProduct);
    expect(mockProductRepository.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a product', async () => {
    // Arrange
    const updateProductDto: CreateProductDto = {
      name: 'Test Product',
      description: 'Testing product description',
      imageUrl: 'https://test.com/image.jpg',
      price: '15.99',
      stock: 10,
      categoryId: '1',
      category: {
        id: 1,
        name: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    const expectedProduct: Product = {
      id: 1,
      name: 'Test Product',
      description: 'https://test.com/image.jpg',
      price: '15.99',
      stock: 10,
      categoryId: 1,
      categoryName: 'Test Category',
      createdAt: new Date(),
      updatedAt: new Date(),
      getStock() {
        return this.stock;
      },
    };

    jest
      .spyOn(mockProductRepository, 'update')
      .mockResolvedValue(expectedProduct);

    // Act
    const result = await service.update('1', updateProductDto);

    // Assert
    expect(result).toEqual(expectedProduct);
    expect(mockProductRepository.update).toHaveBeenCalledWith(
      '1',
      updateProductDto,
    );
  });

  it('should remove a product', async () => {
    // Arrange
    const expectedProduct: Product = {
      id: 1,
      name: 'Test Product',
      description: 'https://test.com/image.jpg',
      price: '15.99',
      stock: 10,
      categoryId: 1,
      categoryName: 'Test Category',
      createdAt: new Date(),
      updatedAt: new Date(),
      getStock() {
        return this.stock;
      },
    };

    jest
      .spyOn(mockProductRepository, 'findOne')
      .mockResolvedValue(expectedProduct);

    jest
      .spyOn(mockProductRepository, 'remove')
      .mockResolvedValue(expectedProduct);

    // Act
    const result = await service.remove('1');

    // Assert
    expect(result).toEqual(expectedProduct);
    expect(mockProductRepository.remove).toHaveBeenCalledWith('1');
  });

  it('should find products by category', async () => {
    // Arrange
    const expectedProducts: Product[] = [
      {
        id: 1,
        name: 'Test Product',
        description: 'https://test.com/image.jpg',
        price: '15.99',
        stock: 10,
        categoryId: 1,
        categoryName: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date(),
        getStock() {
          return this.stock;
        },
      },
    ];

    jest
      .spyOn(mockProductRepository, 'productsByCategory')
      .mockResolvedValue(expectedProducts);

    // Act
    const result = await service.productsByCategory('1');

    // Assert
    expect(result).toEqual(expectedProducts);
    expect(mockProductRepository.productsByCategory).toHaveBeenCalledWith('1');
  });
});
