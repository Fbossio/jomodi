import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './ports/category-repository';

describe('CategoryService', () => {
  let service: CategoryService;
  let mockCategoryRepository: jest.Mocked<CategoryRepository>;

  beforeEach(async () => {
    mockCategoryRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: 'CategoryRepository',
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    // Arrange
    const createCategoryDto: CreateCategoryDto = {
      name: '',
    };

    const createdCategory: Category = {
      id: 0,
      name: '',
      createdAt: undefined,
      updatedAt: undefined,
    };

    mockCategoryRepository.create.mockResolvedValue(createdCategory);

    // Act
    const result = await service.create(createCategoryDto);

    // Assert
    expect(mockCategoryRepository.create).toHaveBeenCalledWith(
      createCategoryDto,
    );
    expect(result).toEqual(createdCategory);
  });

  it('should find all categories', async () => {
    // Arrange
    const categories: Category[] = [
      {
        id: 0,
        name: '',
        createdAt: undefined,
        updatedAt: undefined,
      },
    ];

    mockCategoryRepository.findAll.mockResolvedValue(categories);

    // Act
    const result = await service.findAll();

    // Assert
    expect(mockCategoryRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(categories);
  });

  it('should find one category', async () => {
    // Arrange
    const id = 0;
    const category: Category = {
      id,
      name: '',
      createdAt: undefined,
      updatedAt: undefined,
    };

    mockCategoryRepository.findOne.mockResolvedValue(category);

    // Act
    const result = await service.findOne(id.toString());

    // Assert

    expect(result).toEqual(category);
  });

  it('should update a category', async () => {
    // Arrange
    const id = 0;
    const updateCategoryDto: CreateCategoryDto = {
      name: '',
    };
    const updatedCategory: Category = {
      id,
      name: '',
      createdAt: undefined,
      updatedAt: undefined,
    };

    mockCategoryRepository.update.mockResolvedValue(updatedCategory);

    // Act
    const result = await service.update(id.toString(), updateCategoryDto);

    // Assert
    expect(mockCategoryRepository.update).toHaveBeenCalledWith(
      id.toString(),
      updateCategoryDto,
    );
    expect(result).toEqual(updatedCategory);
  });

  it('should remove a category', async () => {
    // Arrange
    const id = 0;

    mockCategoryRepository.remove.mockResolvedValue(null);

    // Act
    const result = await service.remove(id.toString());

    // Assert
    expect(mockCategoryRepository.remove).toHaveBeenCalledWith(id.toString());
    expect(result).toEqual(null);
  });
});
