import { createAction, props } from '@ngrx/store';
import { Banner } from '../../core/models/banner.interface';

export const loadBanners = createAction(
  '[Banner List] Load Banners'
);

export const loadBannersSuccess = createAction(
  '[Banner List] Load Banners Success',
  props<{ banners: Banner[] }>()
);

export const loadBannersFailure = createAction(
  '[Banner List] Load Banners Failure',
  props<{ error: any }>()
);
