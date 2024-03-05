import { createAction, props } from '@ngrx/store';
import { Item, Meta } from '../../core/models/item.interface';

export const loadItems = createAction(
  '[Item List] Load Items'
);

export const loadItemsSuccess = createAction(
  '[Item List] Load Items Success',
  props<{ items: Item[], meta: Meta }>()
);

export const loadItemsFailure = createAction(
  '[Item List] Load Items Failure',
  props<{ error: any }>()
);

export const setCurrentItem = createAction(
  '[Item List] Set Current Item',
  props<{ item: Item }>()
);

export const loadItem = createAction(
  '[Item List] Load Item',
  props<{ id: number }>()
);

export const loadItemSuccess = createAction(
  '[Item List] Load Item Success',
  props<{ item: Item }>()
);

export const loadItemFailure = createAction(
  '[Item List] Load Item Failure',
  props<{ error: any }>()
);

export const updateItem = createAction(
  '[Item List] Update Item',
  props<{ id: number, item: any }>()
);

export const updateItemSuccess = createAction(
  '[Item List] Update Item Success',
  props<{ item: Item }>()
);

export const updateItemFailure = createAction(
  '[Item List] Update Item Failure',
  props<{ error: any }>()
);

export const createItem = createAction(
  '[Item List] Create Item',
  props<{ item: any }>()
);

export const createItemSuccess = createAction(
  '[Item List] Create Item Success',
  props<{ item: Item }>()
);

export const createItemFailure = createAction(
  '[Item List] Create Item Failure',
  props<{ error: any }>()
);

