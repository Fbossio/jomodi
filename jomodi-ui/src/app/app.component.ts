import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from './state/app.state';
import { selectCartItems } from './state/selectors/cart.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'jomodi-ui';
  totalQuantity: number = 0;
  private subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription.add(
      this.store.select(selectCartItems).subscribe(items => {
        this.totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
      })
    )
  }

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  onToggleSidenav() {
    this.sidenav.toggle();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


