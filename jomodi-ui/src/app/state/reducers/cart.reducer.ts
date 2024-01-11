import { createReducer, on } from '@ngrx/store';
import { CartState } from '../../core/models/cart.state';
import { addCartItem, removeCartItem } from '../actions/cart.actions';

export const initialState: CartState = {
  items: [],
  total: 0
};

export const cartReducer = createReducer(
  initialState,
  on(addCartItem, (state, { item }) => {
    const items = [...state.items, item];
    const total = items.reduce((acc, curr) => acc + curr.price, 0);
    return { ...state, items, total };
  }),
  on(removeCartItem, (state, { id }) => {
    const items = state.items.filter(item => item.id !== id);
    const total = items.reduce((acc, curr) => acc + curr.price, 0);
    return { ...state, items, total };
  })
)
