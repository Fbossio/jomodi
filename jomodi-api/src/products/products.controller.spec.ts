import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/ports/category-repository';
import { ImageStoragePort } from '../common/ports/image-storage';
import { StringFormatter } from '../common/string-formatter';
import { ProductRepository } from './ports/product-repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockProductsService: jest.Mocked<ProductsService>;
  let mockImageStoragePort: jest.Mocked<ImageStoragePort>;
  let mockStringFormatter: jest.Mocked<StringFormatter>;
  let mockCategoryRepository: jest.Mocked<CategoryRepository>;
  let mockProductRepository: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    mockProductsService = {
      uploadImage: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      productsByCategory: jest.fn(),
    } as any;

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
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
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

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const mockFile = {
      originalname: 'test',
      buffer: Buffer.from('test'),
      mimetype: 'image/png',
    } as Express.Multer.File;
    const mockCreateProductDto = {
      name: 'test',
      description: 'test',
      price: 1,
      categoryId: 'test',
    } as any;
    const mockSavedImage = 'test';
    const mockCreateProduct = {
      ...mockCreateProductDto,
      imageUrl: mockSavedImage,
    };
    mockProductsService.uploadImage.mockResolvedValue(mockSavedImage);
    mockProductsService.create.mockResolvedValue(mockCreateProduct as any);

    const result = await controller.create(mockFile, mockCreateProductDto);

    expect(result).toEqual(mockCreateProduct);
    expect(mockProductsService.uploadImage).toHaveBeenCalledWith(
      mockFile.originalname,
      mockFile.buffer,
      mockFile.mimetype,
    );
    expect(mockProductsService.create).toHaveBeenCalledWith(mockCreateProduct);
  });

  it('should find all products', async () => {
    const mockProducts = [
      {
        id: 'test',
        name: 'test',
        description: 'test',
        imageUrl: 'test',
        price: 1,
        stock: 1,
        categoryId: 'test',
        categoryName: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest
      .spyOn(mockProductsService, 'findAll')
      .mockResolvedValue(mockProducts as any);

    const result = await controller.findAll();

    expect(result).toEqual(mockProducts);
    expect(mockProductsService.findAll).toHaveBeenCalled();
  });

  it('should find one product', async () => {
    const mockProduct = {
      id: 'test',
      name: 'test',
      description: 'test',
      imageUrl: 'test',
      price: 1,
      categoryId: 'test',
      categoryName: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockProductsService.findOne.mockResolvedValue(mockProduct as any);

    const result = await controller.findOne('test');

    expect(result).toEqual(mockProduct);
    expect(mockProductsService.findOne).toHaveBeenCalledWith('test');
  });

  it('should update a product', async () => {
    const mockUpdateProductDto = {
      name: 'test',
      description: 'test',
      price: 1,
      categoryId: 'test',
    } as any;
    const mockUpdatedProduct = {
      ...mockUpdateProductDto,
      imageUrl: 'test',
    };
    mockProductsService.update.mockResolvedValue(mockUpdatedProduct as any);

    const result = await controller.update('test', mockUpdateProductDto);

    expect(result).toEqual(mockUpdatedProduct);
    expect(mockProductsService.update).toHaveBeenCalledWith(
      'test',
      mockUpdateProductDto,
    );
  });

  it('should remove a product', async () => {
    mockProductsService.remove.mockResolvedValue(null);

    const result = await controller.remove('test');

    expect(result).toEqual(null);
    expect(mockProductsService.remove).toHaveBeenCalledWith('test');
  });

  it('should find products by category', async () => {
    const mockProducts = [
      {
        id: 'test',
        name: 'test',
        description: 'test',
        imageUrl: 'test',
        price: 1,
        categoryId: 'test',
        categoryName: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockProductsService.productsByCategory.mockResolvedValue(
      mockProducts as any,
    );

    const result = await controller.productsByCategory('test');

    expect(result).toEqual(mockProducts);
    expect(mockProductsService.productsByCategory).toHaveBeenCalledWith('test');
  });
});
