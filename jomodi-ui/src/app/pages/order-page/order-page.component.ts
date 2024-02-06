import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Order } from '../../core/models/order.interface';
import { AppState } from '../../state/app.state';
import { selectOrder } from '../../state/selectors/order.selector';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  order: Order | null = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscriptions.add(
      this.store.select(selectOrder).subscribe(order => {
        this.order = order;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
