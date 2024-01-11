import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../core/models/cart.interface';

export const addCartItem = createAction(
  '[Cart] Add Cart Item',
  props<{ item: CartItem }>()
);

export const removeCartItem = createAction(
  '[Cart] Remove Cart Item',
  props<{ id: number }>()
);
