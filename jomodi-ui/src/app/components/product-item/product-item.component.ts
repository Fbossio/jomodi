import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { addCartItem } from '../../state/actions/cart.actions';
import { setCurrentItem } from '../../state/actions/itmems.actions';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product:any = {};
  maxQuantity: number = 0;
  quantityArray: number[] = [];
  selectedQuantity = 1;

  constructor(private store: Store<AppState>) { }

  handleClick() {
    this.store.dispatch(setCurrentItem({ item: this.product }));
  }

  ngOnInit() {
    this.maxQuantity = this.product && this.product.stock >= 20 ? 20 : this.product?.stock || 0;
    this.quantityArray = Array.from({ length: this.maxQuantity }, (_, i) => i + 1);
  }

  addToCart() {
    if (this.product) {
      const item = { ...this.product, quantity: this.selectedQuantity };
      this.store.dispatch(addCartItem({ item }));
    }
  }

}
