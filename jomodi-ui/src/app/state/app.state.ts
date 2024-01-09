import { ActionReducerMap } from "@ngrx/store";
import { ItemsState } from "../core/models/item.state";
import { PaginationState } from "../core/models/pagination.state";
import { itemsReducer } from "./reducers/items.reducer";
import { paginationReducer } from "./reducers/pagination.reducer";

export interface AppState {
  items: ItemsState;
  pagination: PaginationState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  items: itemsReducer,
  pagination: paginationReducer
};
