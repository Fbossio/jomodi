import { Item } from "./item.interface";

export interface ItemsState {
  loading: boolean;
  items: ReadonlyArray<Item>
}
