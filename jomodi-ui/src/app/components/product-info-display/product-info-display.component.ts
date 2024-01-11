import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Item } from '../../core/models/item.interface';
import { loadItem } from '../../state/actions/itmems.actions';
import { AppState } from '../../state/app.state';
import { selectItem } from '../../state/selectors/item.selector';
import { selectCurrentItem } from '../../state/selectors/items.selector';

@Component({
  selector: 'app-product-info-display',
  templateUrl: './product-info-display.component.html',
  styleUrls: ['./product-info-display.component.css']
})
export class ProductInfoDisplayComponent implements OnInit, OnDestroy {


  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  private subscriptions = new Subscription();
  currentItem$: Observable<any> = new Observable();
  currentItem: Item | null = null;
  maxQuantity: number = 0;
  quantityArray: number[] = [];
  selectedQuantity = 1;


  ngOnInit() {
    this.subscriptions.add(
      this.store.select(selectCurrentItem).subscribe(item => {
        this.currentItem = item;
        this.maxQuantity = item && item.stock >= 20 ? 20 : item?.stock || 0;
        this.quantityArray = Array.from({ length: this.maxQuantity }, (_, i) => i + 1);
      })
    );

    if (this.currentItem === null) {
      this.subscriptions.add(
        this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          if (id) {
            this.store.dispatch(loadItem({ id: +id }));
            this.subscriptions.add(
              this.store.select(selectItem).subscribe(item => {
                this.currentItem = item;
                this.maxQuantity = item && item.stock >= 20 ? 20 : item?.stock || 0;
                this.quantityArray = Array.from({ length: this.maxQuantity }, (_, i) => i + 1);
              })
            );
          }
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
