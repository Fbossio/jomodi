import { createAction, props } from '@ngrx/store';
import { Banner, UpdateBanner } from '../../core/models/banner.interface';

export const loadBanners = createAction(
  '[Banner List] Load Banners',
);

export const loadBannersSuccess = createAction(
  '[Banner List] Load Banners Success',
  props<{ banners: Banner[] }>()
);

export const loadBannersFailure = createAction(
  '[Banner List] Load Banners Failure',
  props<{ error: any }>()
);

export const setCurrentBanner = createAction(
  '[Banner List] Set Current Banner',
  props<{ banner: Banner }>()
);

export const updateBanner = createAction(
  '[Banner List] Update Banner',
  props<{ id: number, data: UpdateBanner }>()
);

export const updateBannerSuccess = createAction(
  '[Banner List] Update Banner Success',
  props<{ banner: Banner }>()
);

export const updateBannerFailure = createAction(
  '[Banner List] Update Banner Failure',
  props<{ error: any }>()
);

export const deleteBanner = createAction(
  '[Banner List] Delete Banner',
  props<{ id: number }>()
);

export const deleteBannerSuccess = createAction(
  '[Banner List] Delete Banner Success',
  props<{ id: number }>()
);

export const deleteBannerFailure = createAction(
  '[Banner List] Delete Banner Failure',
  props<{ error: any }>()
);

export const createBanner = createAction(
  '[Banner List] Create Banner',
  props<{ data: FormData }>()
);

export const createBannerSuccess = createAction(
  '[Banner List] Create Banner Success',
  props<{ banner: Banner }>()
);

export const createBannerFailure = createAction(
  '[Banner List] Create Banner Failure',
  props<{ error: any }>()
);
