import { createSelector } from '@ngrx/store';
import { CategoryState } from '../../core/models/category.state';
import { AppState } from '../app.state';

export const selectCategoryFeature = (state: AppState) => state.categories;

export const selectCategoryList = createSelector(
  selectCategoryFeature,
  (state: CategoryState) => state.categories
);

export const selectCurrentCategory = createSelector(
  selectCategoryFeature,
  (state: CategoryState) => state.currentCategory
);
