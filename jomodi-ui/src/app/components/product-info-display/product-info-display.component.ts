import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '../../core/models/item.interface';
import { AppState } from '../../state/app.state';
import { selectCurrentItem } from '../../state/selectors/items.selector';

@Component({
  selector: 'app-product-info-display',
  templateUrl: './product-info-display.component.html',
  styleUrls: ['./product-info-display.component.css']
})
export class ProductInfoDisplayComponent {

  constructor(private store: Store<AppState>) { }

  currentItem$: Observable<any> = new Observable();
  currentItem: Item = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    categoryId: 0,
    categoryName: ''
  };


  ngOnInit() {
    this.currentItem$ = this.store.select(selectCurrentItem);
    this.currentItem$.subscribe(item => {
      this.currentItem = item;
    });
  }
}
