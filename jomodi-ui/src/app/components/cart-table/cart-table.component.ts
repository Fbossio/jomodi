import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CartItem } from '../../core/models/cart.interface';
import { removeCartItem, updateQuantity } from '../../state/actions/cart.actions';
import { AppState } from '../../state/app.state';
import { selectCartItems, selectCartTotal } from '../../state/selectors/cart.selector';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private router: Router
    ) {}


  cartItems: readonly CartItem[] = [];
  displayedColumns: string[] = ['name', 'image' ,'price', 'quantity', 'action'];
  quantityArray: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  totalPrice: number = 0;

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(selectCartItems).subscribe((data) => {
        if (data.length === 0) {
          this.router.navigate(['/empty-cart']);
        } else {
          this.cartItems = data.map(item => ({ ...item }));
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

  onItemQuantityChange(id: number, newQuantity: number) {
    const updatedItem = { ...this.cartItems.find(item => item.id === id), quantity: newQuantity } as CartItem;
    this.store.dispatch(updateQuantity({ updatedItem }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


