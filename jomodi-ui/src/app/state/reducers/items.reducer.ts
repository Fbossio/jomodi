import { createReducer, on } from '@ngrx/store';
import { ItemsState } from '../../core/models/item.state';
import { createItem, createItemFailure, createItemSuccess, loadItems, loadItemsFailure, loadItemsSuccess, setCurrentItem } from '../actions/itmems.actions';



export const initialState: ItemsState = {
  loading: false,
  items: [],
  currentItem: null
}

export const itemsReducer = createReducer(
  initialState,
  on(loadItems, state => ({ ...state, loading: true })),
  on(loadItemsSuccess, (state, { items, meta }) => ({ ...state, loading: false, items, meta })),
  on(loadItemsFailure, state => ({ ...state, loading: false })),
  on(setCurrentItem, (state, { item }) => ({ ...state, currentItem: item })),
  on(createItem, state => ({ ...state, loading: true })),
  on(createItemSuccess, (state, { item }) => ({ ...state, loading: false, items: [...state.items, item] })),
  on(createItemFailure, state => ({ ...state, loading: false }))

)
