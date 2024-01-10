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




