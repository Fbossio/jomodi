import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';
import { selectItemsList } from '../../state/selectors/items.selector';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent {

  constructor(
    private store: Store<AppState>,
    private router: Router,
    ) {}


  items$: Observable<any> = new Observable();

  ngOnInit() {
    this.items$ = this.store.select(selectItemsList);
  }

  edit(id: number) {
    this.router.navigate([`/admin/edit-product/${id}`]);
  }
}
