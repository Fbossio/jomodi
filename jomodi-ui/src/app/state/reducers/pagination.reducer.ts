import { createReducer, on } from '@ngrx/store';
import { PaginationState } from '../../core/models/pagination.state';
import { setLimit, setPage } from '../actions/pagination.actions';

export const initialState: PaginationState = {
  page: 1,
  limit: 10
}

export const paginationReducer = createReducer(
  initialState,
  on(setPage, (state, { page }) => ({ ...state, page })),
  on(setLimit, (state, { limit }) => ({ ...state, limit }))
)
