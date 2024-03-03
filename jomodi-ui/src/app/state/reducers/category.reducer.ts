import { createReducer, on } from '@ngrx/store';
import { CategoryState } from '../../core/models/category.state';
import { loadCategories, loadCategoriesFailure, loadCategoriesSuccess } from '../actions/category.actions';

export const initialState: CategoryState = {
  categories: [],
  loading: false,
}

export const categoryReducer = createReducer(
  initialState,
  on(loadCategories, state => ({ ...state, loading: true })),
  on(loadCategoriesSuccess, (state, { categories }) => ({ ...state, categories, loading: false })),
  on(loadCategoriesFailure, state => ({ ...state, loading: false }))
)

