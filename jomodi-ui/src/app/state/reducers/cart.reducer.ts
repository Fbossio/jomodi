import { createReducer, on } from '@ngrx/store';
import { CartState } from '../../core/models/cart.state';
import { addCartItem, removeCartItem, updateQuantity } from '../actions/cart.actions';

export const initialState: CartState = {
  items: [],
  total: 0
};

export const cartReducer = createReducer(
  initialState,
  on(addCartItem, (state, { item }) => {
    const existingItemIndex = state.items.findIndex(i => i.id === item.id);

    let updatedItems = [...state.items];
    if (existingItemIndex >= 0) {
      // If item exists, update quantity
      const existingItem = updatedItems[existingItemIndex];
      updatedItems[existingItemIndex] = { ...existingItem, quantity: existingItem.quantity + item.quantity };
    } else {
      // If item does not exist, add it
      updatedItems = [...state.items, item];
    }

    const total = updatedItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    return { ...state, items: updatedItems, total };
  }),
  on(removeCartItem, (state, { id }) => {
    const items = state.items.filter(item => item.id !== id);
    const total = items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    return { ...state, items, total };
  }),
  on(updateQuantity, (state, { updatedItem }) => {
    const items = state.items.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    const total = items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    return { ...state, items, total };
  }),
);
