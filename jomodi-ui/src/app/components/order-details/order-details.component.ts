import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Order } from '../../core/models/order.interface';
import { cancelOrder } from '../../state/actions/order.actions';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  @Input() order: Order | null = null;

  constructor(
    private store: Store<AppState>,
    private router: Router
    ) {}

  cancelOrder(orderId: string | undefined) {
    if (typeof orderId === 'string') {
      this.store.dispatch(cancelOrder({ orderId, payload: {status: 'cancelled'}}))
      this.router.navigate(['/'])
    } else {
      console.error('Order not found');
    }

  }
}
