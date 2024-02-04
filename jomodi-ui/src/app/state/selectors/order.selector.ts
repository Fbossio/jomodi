import { createSelector } from '@ngrx/store';
import { OrderState } from '../../core/models/order.state';
import { AppState } from '../app.state';

export const selectOrderFeature = (state: AppState) => state.order;

export const selectOrder = createSelector(
  selectOrderFeature,
  (state: OrderState) => state.order
);
