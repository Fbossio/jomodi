import { ActionReducerMap } from "@ngrx/store";
import { ItemsState } from "../core/models/item.state";
import { itemsReducer } from "./reducers/items.reducer";

export interface AppState {
  items: ItemsState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  items: itemsReducer
};
