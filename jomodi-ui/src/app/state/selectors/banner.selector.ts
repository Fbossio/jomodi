import { createSelector } from '@ngrx/store';
import { BannerState } from '../../core/models/banner.state';
import { AppState } from '../app.state';

export const selectBannerFeature = (state: AppState) => state.banner;

export const selectBannerList = createSelector(
  selectBannerFeature,
  (state: BannerState) => state.banners
);

export const selectBannerLoading = createSelector(
  selectBannerFeature,
  (state: BannerState) => state.loading
)
