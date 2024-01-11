import { createSelector } from '@ngrx/store';
import { CartState } from '../../core/models/cart.state';
import { AppState } from '../app.state';

export const selectCartFeature = (state: AppState) => state.cart;

export const selectCartItems = createSelector(
  selectCartFeature,
  (state: CartState) => state.items
);

export const selectCartTotal = createSelector(
  selectCartFeature,
  (state: CartState) => state.total
);
