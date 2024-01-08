import { createReducer, on } from '@ngrx/store';
import { ItemsState } from '../../core/models/item.state';
import { loadItems, loadItemsFailure, loadItemsSuccess } from '../actions/itmems.actions';



export const initialState: ItemsState = {
  loading: false,
  items: []
}

export const itemsReducer = createReducer(
  initialState,
  on(loadItems, state => ({ ...state, loading: true })),
  on(loadItemsSuccess, (state, { items }) => ({ ...state, loading: false, items })),
  on(loadItemsFailure, state => ({ ...state, loading: false }))
)
