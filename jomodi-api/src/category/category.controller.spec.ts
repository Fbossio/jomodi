import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoryController', () => {
  let controller: CategoryController;
  let mockCategoryService: jest.Mocked<CategoryService>;

  beforeEach(async () => {
    mockCategoryService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<CategoryService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  describe('create', () => {
    it('should create a category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: '',
      };

      const createdCategory = {
        // provide the expected created category object
        id: 0,
        name: '',
      };

      mockCategoryService.create.mockResolvedValue(createdCategory as any);

      const result = await controller.create(createCategoryDto);

      expect(mockCategoryService.create).toHaveBeenCalledWith(
        createCategoryDto,
      );
      expect(result).toEqual(createdCategory);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories = [
        {
          id: 0,
          name: '',
        },
      ];

      mockCategoryService.findAll.mockResolvedValue(categories as any);

      const result = await controller.findAll();

      expect(mockCategoryService.findAll).toHaveBeenCalled();
      expect(result).toEqual(categories);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      const category = {
        id: 0,
        name: '',
      };

      mockCategoryService.findOne.mockResolvedValue(category as any);

      const result = await controller.findOne('0');

      expect(mockCategoryService.findOne).toHaveBeenCalledWith('0');
      expect(result).toEqual(category);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateCategoryDto = {
        name: '',
      };

      const updatedCategory = {
        id: 0,
        name: '',
      };

      mockCategoryService.update.mockResolvedValue(updatedCategory as any);

      const result = await controller.update('0', updateCategoryDto);

      expect(mockCategoryService.update).toHaveBeenCalledWith(
        '0',
        updateCategoryDto,
      );
      expect(result).toEqual(updatedCategory);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      const mockResponse = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };
      const deletedCategory = {
        id: 0,
        name: '',
      };

      mockCategoryService.remove.mockResolvedValue(deletedCategory as any);
      const res = mockResponse();

      const result = await controller.remove('0', res);

      expect(mockCategoryService.remove).toHaveBeenCalledWith('0');
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Category deleted',
        deletedCategory,
      });
    });
  });
});
