import { ActionReducerMap } from "@ngrx/store";
import { BannerState } from "../core/models/banner.state";
import { CartState } from "../core/models/cart.state";
import { ItemState, ItemsState } from "../core/models/item.state";
import { OrderState } from "../core/models/order.state";
import { PaginationState } from "../core/models/pagination.state";
import { PaymentIntentState } from "../core/models/paymentIntent.interface";
import { bannerReducer } from "./reducers/banner.reducer";
import { cartReducer } from "./reducers/cart.reducer";
import { itemReducer } from "./reducers/item.reducer";
import { itemsReducer } from "./reducers/items.reducer";
import { orderReducer } from "./reducers/order.reducer";
import { paginationReducer } from "./reducers/pagination.reducer";
import { paymentIntentReducer } from "./reducers/paymentIntent.reducer";

export interface AppState {
  items: ItemsState;
  pagination: PaginationState;
  banner: BannerState;
  item: ItemState;
  cart: CartState;
  order: OrderState;
  clientSecret: PaymentIntentState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  items: itemsReducer,
  pagination: paginationReducer,
  banner: bannerReducer,
  item: itemReducer,
  cart: cartReducer,
  order: orderReducer,
  clientSecret: paymentIntentReducer,
};
