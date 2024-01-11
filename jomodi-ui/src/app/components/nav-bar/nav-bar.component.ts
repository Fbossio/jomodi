import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { selectCartItems } from '../../state/selectors/cart.selector';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Output() toggle = new EventEmitter<void>();

  constructor(private store: Store<AppState>) { }

  totalQuantity: number = 0;

  ngOnInit() {
    this.store.select(selectCartItems).subscribe(items => {
      this.totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    });
  }

  toggleSidenav() {
    this.toggle.emit();
  }

}
