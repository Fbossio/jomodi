import { createReducer, on } from '@ngrx/store';
import { CategoryState } from '../../core/models/category.state';
import {
  createCategory,
  createCategoryFailure,
  createCategorySuccess,
  deleteCategory,
  deleteCategoryFailure,
  deleteCategorySuccess,
  loadCategories,
  loadCategoriesFailure,
  loadCategoriesSuccess,
  setCurrentCategory,
  updateCategory,
  updateCategoryFailure,
  updateCategorySuccess
} from '../actions/category.actions';

export const initialState: CategoryState = {
  categories: [],
  loading: false,
  currentCategory: null
}

export const categoryReducer = createReducer(
  initialState,
  on(loadCategories, state => ({ ...state, loading: true })),
  on(loadCategoriesSuccess, (state, { categories }) => ({ ...state, categories, loading: false })),
  on(loadCategoriesFailure, state => ({ ...state, loading: false })),
  on(createCategory, state => ({ ...state, loading: true })),
  on(createCategorySuccess, (state, { category }) => ({ ...state, categories: [...state.categories, category], loading: false })),
  on(createCategoryFailure, state => ({ ...state, loading: false })),
  on(setCurrentCategory, (state, { category }) => ({ ...state, currentCategory: category })),
  on(updateCategory, state => ({ ...state, loading: true })),
  on(updateCategorySuccess, (state, { category }) => {
    const index = state.categories.findIndex(c => c.id === category.id);
    const categories = [...state.categories];
    categories[index] = category;
    return { ...state, categories, loading: false };
  }),
  on(updateCategoryFailure, state => ({ ...state, loading: false })),
  on(deleteCategory, state => ({ ...state, loading: true })),
  on(deleteCategorySuccess, (state, { id }) => {
    const categories = state.categories.filter(c => c.id !== id);
    return { ...state, categories, loading: false };
  }),
  on(deleteCategoryFailure, state => ({ ...state, loading: false }))
)

