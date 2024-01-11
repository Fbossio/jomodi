import { CartItem } from "./cart.interface";

export interface CartState {
  items: ReadonlyArray<CartItem>
  total: number;
}
