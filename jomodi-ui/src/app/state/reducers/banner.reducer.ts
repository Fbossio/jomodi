import { createReducer, on } from '@ngrx/store';
import { BannerState } from '../../core/models/banner.state';
import { loadBanners, loadBannersFailure, loadBannersSuccess } from '../actions/banner.actions';

export const initialState: BannerState = {
  banners: [],
  loading: false,
}

export const bannerReducer = createReducer(
  initialState,
  on(loadBanners, state => ({ ...state, loading: true })),
  on(loadBannersSuccess, (state, { banners }) => ({ ...state, banners, loading: false })),
  on(loadBannersFailure, state => ({ ...state, loading: false }))
)
