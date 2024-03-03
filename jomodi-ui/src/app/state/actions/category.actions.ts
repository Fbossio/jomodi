import { createAction, props } from '@ngrx/store';
import { Category } from '../../core/models/category.interface';

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
