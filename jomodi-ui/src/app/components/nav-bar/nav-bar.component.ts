import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../state/app.state';
import { selectCartItems } from '../../state/selectors/cart.selector';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Output() toggle = new EventEmitter<void>();
  private subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  totalQuantity: number = 0;

  ngOnInit() {
    this.subscription.add(
      this.store.select(selectCartItems).subscribe(items => {
        this.totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
      })
    )
  }

  toggleSidenav() {
    this.toggle.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
