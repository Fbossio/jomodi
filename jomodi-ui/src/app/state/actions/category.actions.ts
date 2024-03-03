import { createAction, props } from '@ngrx/store';
import { Category, CreateCategory } from '../../core/models/category.interface';

export const loadCategories = createAction(
  '[Category List] Load Categories',
);

export const loadCategoriesSuccess = createAction(
  '[Category List] Load Categories Success',
  props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Category List] Load Categories Failure',
  props<{ error: any }>()
);

export const setCurrentCategory = createAction(
  '[Category List] Set Current Category',
  props<{ category: Category }>()
);

export const createCategory = createAction(
  '[Category List] Create Category',
  props<{ category: CreateCategory }>()
);

export const createCategorySuccess = createAction(
  '[Category List] Create Category Success',
  props<{ category: Category }>()
);

export const createCategoryFailure = createAction(
  '[Category List] Create Category Failure',
  props<{ error: any }>()
);

export const updateCategory = createAction(
  '[Category List] Update Category',
  props<{ id: number, category: CreateCategory }>()
);

export const updateCategorySuccess = createAction(
  '[Category List] Update Category Success',
  props<{ category: Category }>()
);

export const updateCategoryFailure = createAction(
  '[Category List] Update Category Failure',
  props<{ error: any }>()
);

export const deleteCategory = createAction(
  '[Category List] Delete Category',
  props<{ id: number }>()
);

export const deleteCategorySuccess = createAction(
  '[Category List] Delete Category Success',
  props<{ id: number }>()
);

export const deleteCategoryFailure = createAction(
  '[Category List] Delete Category Failure',
  props<{ error: any }>()
);

