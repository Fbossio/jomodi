import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  create(category: CreateCategoryDto): Promise<Category>;
  findAll(): Promise<Category[]>;
  findOne(id: string): Promise<Category>;
  update(id: string, category: UpdateCategoryDto): Promise<Category>;
  remove(id: string): Promise<Category>;
}
