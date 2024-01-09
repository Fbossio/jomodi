import { createAction, props } from '@ngrx/store';

export const setPage = createAction(
  '[Pagination] Set Page',
  props<{ page: number }>()
);

export const setLimit = createAction(
  '[Pagination] Set Limit',
  props<{ limit: number }>()
);
