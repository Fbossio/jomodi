import { ActionReducerMap } from "@ngrx/store";
import { BannerState } from "../core/models/banner.state";
import { CartState } from "../core/models/cart.state";
import { ItemState, ItemsState } from "../core/models/item.state";
import { PaginationState } from "../core/models/pagination.state";
import { bannerReducer } from "./reducers/banner.reducer";
import { cartReducer } from "./reducers/cart.reducer";
import { itemReducer } from "./reducers/item.reducer";
import { itemsReducer } from "./reducers/items.reducer";
import { paginationReducer } from "./reducers/pagination.reducer";

export interface AppState {
  items: ItemsState;
  pagination: PaginationState;
  banner: BannerState;
  item: ItemState;
  cart: CartState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  items: itemsReducer,
  pagination: paginationReducer,
  banner: bannerReducer,
  item: itemReducer,
  cart: cartReducer,
};
