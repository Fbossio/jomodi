import { createSelector } from '@ngrx/store';
import { PaginationState } from '../../core/models/pagination.state';
import { AppState } from '../app.state';

export const selectPaginationFeature = (state: AppState) => state.pagination;

export const selectPage = createSelector(
  selectPaginationFeature,
  (state: PaginationState) => state.page
);

export const selectLimit = createSelector(
  selectPaginationFeature,
  (state: PaginationState) => state.limit
);
