import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';
import { CategoryRepository } from '../ports/category-repository';
import { CategoryEntity } from '../schemas/category.schema';

@Injectable()
export class CategoryPostgresAdapter implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(category: CreateCategoryDto): Promise<Category> {
    const createdCategory = this.categoryRepository.create(category);
    try {
      await this.categoryRepository.save(createdCategory);
      return new Category(createdCategory);
    } catch (error) {
      Promise.reject(error);
    }
  }
  async findAll(): Promise<Category[]> {
    try {
      const categories = await this.categoryRepository.find();
      return categories.map((category) => new Category(category));
    } catch (error) {
      Promise.reject(error);
    }
  }
  async findOne(id: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: Number(id) },
      });
      return new Category(category);
    } catch (error) {
      Promise.reject(error);
    }
  }
  async update(id: string, category: UpdateCategoryDto): Promise<Category> {
    try {
      await this.categoryRepository.update(id, category);
      const updatedCategory = await this.categoryRepository.findOne({
        where: { id: Number(id) },
      });
      return new Category(updatedCategory);
    } catch (error) {
      Promise.reject(error);
    }
  }
  async remove(id: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        relations: ['products'],
        where: { id: Number(id) },
      });

      if (category.products.length > 0) {
        throw new Error('Category has products');
      }

      await this.categoryRepository.delete(id);
      return new Category(category);
    } catch (error) {
      throw error;
    }
  }
}
