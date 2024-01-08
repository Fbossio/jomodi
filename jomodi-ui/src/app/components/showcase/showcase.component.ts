import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination } from '../../core/models/item.interface';
// import { products } from '../../pages/product-list/poducts';
import { ShowcaseServiceService } from '../../services/showcase-service.service';
import { loadItems, loadItemsSuccess } from '../../state/actions/itmems.actions';
import { AppState } from '../../state/app.state';
import { selectItemsList } from '../../state/selectors/items.selector';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent {
  loading$: Observable<boolean> = new Observable();

  constructor(
    private store: Store<AppState>,
    private showcaseService: ShowcaseServiceService
    ) {}

  // products: any[] = [];
  items$: Observable<any> = new Observable();


  ngOnInit(): void {
    // this.products = products;
    this.loading$ = this.store.select(state => state.items.loading);
    this.showcaseService.gedDataApi().subscribe((data: Pagination) => {
      this.store.dispatch(loadItemsSuccess({items: data.items}))
    });
    this.store.dispatch(loadItems())
    this.items$ = this.store.select(selectItemsList);
    console.log(this.items$);

  }

}
