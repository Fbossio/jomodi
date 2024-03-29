import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CartItem } from '../../core/models/cart.interface';
import { CreateOrderInterface, Order } from '../../core/models/order.interface';
import { AuthService } from '../../services/auth.service';
import { OrdersService } from '../../services/orders.service';
import { removeCartItem, updateQuantity } from '../../state/actions/cart.actions';
import { createOrder } from '../../state/actions/order.actions';
import { AppState } from '../../state/app.state';
import { selectCartItems, selectCartTotal } from '../../state/selectors/cart.selector';
import { selectOrder } from '../../state/selectors/order.selector';
import { alert } from '../../utils/alert';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  private isOrderProcessing: boolean = false;
  @Input() isLoggedIn: boolean = false;
  @Input() hasDefaultAddress: boolean = false;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private ordersService: OrdersService,
    private authService: AuthService,
    ) {}


  cartItems: readonly CartItem[] = [];
  displayedColumns: string[] = ['name', 'image' ,'price', 'quantity', 'action'];
  quantityArray: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  totalPrice: number = 0;
  orderPlaced: Order | null = null;

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(selectCartItems).subscribe((data) => {
        if (data.length === 0 && !this.isOrderProcessing) {
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

  placeOrder() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      alert('Login first', 'Please login to place order', 'warning');
      return
    } else if (this.isLoggedIn && !this.hasDefaultAddress) {
      alert('Add address', 'Please add address to place order', 'warning');
      return
    }
    this.isOrderProcessing = true;
    const order: CreateOrderInterface = {
      details: this.cartItems.map(item => ({ productId: item.id, quantity: item.quantity }))
    }

    this.store.dispatch(createOrder({ order }));
    const orderSubscription = this.store.select(selectOrder).subscribe(order => {
      if (order && order.data && order.data.id) {
        this.router.navigate([`/order/${order.data.id}`])
        orderSubscription.unsubscribe();
        const itemsId = this.cartItems.map(item => item.id);
        itemsId.forEach(id => this.store.dispatch(removeCartItem({ id })));
      }

    })

    this.subscription.add(orderSubscription);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


