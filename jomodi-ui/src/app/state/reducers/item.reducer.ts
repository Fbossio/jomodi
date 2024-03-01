import { createReducer, on } from '@ngrx/store';
import { ItemState } from '../../core/models/item.state';
import {
  loadItem,
  loadItemFailure,
  loadItemSuccess,
  updateItem,
  updateItemFailure,
  updateItemSuccess
} from '../actions/itmems.actions';

export const initialState: ItemState = {
  loading: false,
  item: {
    id: 0,
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
    stock: 0,
    categoryId: 0,
    categoryName: ''
  }
};

export const itemReducer = createReducer(
  initialState,
  on(loadItem, state => ({ ...state, loading: true })),
  on(loadItemSuccess, (state, { item }) => ({ ...state, loading: false, item })),
  on(loadItemFailure, state => ({ ...state, loading: false })),
  on(updateItem, state => ({ ...state, loading: true })),
  on(updateItemSuccess, (state, { item }) => ({ ...state, loading: false, item })),
  on(updateItemFailure, state => ({ ...state, loading: false })),
)
