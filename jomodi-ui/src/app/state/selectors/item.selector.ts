import { createSelector } from '@ngrx/store';
import { ItemState } from '../../core/models/item.state';
import { AppState } from '../app.state';

export const selectItemFeature = (state: AppState) => state.item;

export const selectItem = createSelector(
  selectItemFeature,
  (state: ItemState) => state.item
);

export const selectItemLoading = createSelector(
  selectItemFeature,
  (state: ItemState) => state.loading
);
