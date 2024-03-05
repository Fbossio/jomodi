import { createReducer, on } from '@ngrx/store';
import { BannerState } from '../../core/models/banner.state';
import {
  createBanner,
  createBannerFailure,
  createBannerSuccess,
  deleteBanner,
  deleteBannerFailure,
  deleteBannerSuccess,
  loadBanners,
  loadBannersFailure,
  loadBannersSuccess,
  setCurrentBanner,
  updateBanner,
  updateBannerFailure,
  updateBannerSuccess
} from '../actions/banner.actions';

export const initialState: BannerState = {
  banners: [],
  loading: false,
  currentBanner: null
}

export const bannerReducer = createReducer(
  initialState,
  on(loadBanners, state => ({ ...state, loading: true })),
  on(loadBannersSuccess, (state, { banners }) => ({ ...state, banners, loading: false })),
  on(loadBannersFailure, state => ({ ...state, loading: false })),
  on(setCurrentBanner, (state, { banner }) => ({ ...state, currentBanner: banner })),
  on(updateBanner, state => ({ ...state, loading: true })),
  on(updateBannerSuccess, (state, { banner }) => {
    const banners = state.banners.map(b => b.id === banner.id ? banner : b);
    return { ...state, banners, loading: false }
  }),
  on(updateBannerFailure, state => ({ ...state, loading: false })),
  on(deleteBanner, state => ({ ...state, loading: true })),
  on(deleteBannerSuccess, (state, { id }) => {
    const banners = state.banners.filter(b => b.id !== id);
    return { ...state, banners, loading: false }
  }),
  on(deleteBannerFailure, state => ({ ...state, loading: false })),
  on(createBanner, state => ({ ...state, loading: true })),
  on(createBannerSuccess, (state, { banner }) => {
    const banners = [...state.banners, banner];
    return { ...state, banners, loading: false }
  }),
  on(createBannerFailure, state => ({ ...state, loading: false }))
)
