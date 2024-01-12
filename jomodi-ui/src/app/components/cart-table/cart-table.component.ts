import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CartItem } from '../../core/models/cart.interface';
import { removeCartItem } from '../../state/actions/cart.actions';
import { AppState } from '../../state/app.state';
import { selectCartTotal } from '../../state/selectors/cart.selector';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  constructor(private store: Store<AppState>) {}


  cartItems: readonly CartItem[] = [];
  displayedColumns: string[] = ['name', 'image' ,'price', 'quantity', 'action'];
  quantityArray: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  totalPrice: number = 0;

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(store => store.cart).subscribe((data) => {
        if (data.items.length > 0) {
          this.cartItems = data.items;
        }
      })
    );

    this.subscription.add(
      this.store.select(selectCartTotal).subscribe((total) => {
        this.totalPrice = total;
      })
    );

  }

  removeItem(id: number) {
    this.store.dispatch(removeCartItem({ id }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


