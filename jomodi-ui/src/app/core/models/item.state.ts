import { Item, Meta } from "./item.interface";

export interface ItemsState {
  loading: boolean;
  items: ReadonlyArray<Item>
  meta?: Meta;
  currentItem: null | Item;
}
