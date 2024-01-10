import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { setCurrentItem } from '../../state/actions/itmems.actions';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product:any = {};

  constructor(private store: Store<AppState>) { }

  handleClick() {
    this.store.dispatch(setCurrentItem({ item: this.product }));
  }

}
