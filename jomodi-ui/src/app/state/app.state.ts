import { ActionReducerMap } from "@ngrx/store";
import { BannerState } from "../core/models/banner.state";
import { ItemsState } from "../core/models/item.state";
import { PaginationState } from "../core/models/pagination.state";
import { bannerReducer } from "./reducers/banner.reducer";
import { itemsReducer } from "./reducers/items.reducer";
import { paginationReducer } from "./reducers/pagination.reducer";

export interface AppState {
  items: ItemsState;
  pagination: PaginationState;
  banner: BannerState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  items: itemsReducer,
  pagination: paginationReducer,
  banner: bannerReducer,
};
