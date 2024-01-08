import { createSelector } from '@ngrx/store';
import { ItemsState } from '../../core/models/item.state';
import { AppState } from '../app.state';

export const selectItemsFeature = (state: AppState) => state.items;

export const selectItemsList = createSelector(
  selectItemsFeature,
  (state: ItemsState) => state.items
);

export const selectItemsLoading = createSelector(
  selectItemsFeature,
  (state: ItemsState) => state.loading
)
