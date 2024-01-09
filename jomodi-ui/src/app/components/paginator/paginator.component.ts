import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setLimit, setPage } from '../../state/actions/pagination.actions';
import { AppState } from '../../state/app.state';
import { selecTotalItems } from '../../state/selectors/items.selector';
import { selectLimit } from '../../state/selectors/pagination.selector';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

  constructor(private store: Store<AppState>) { }

  limit$: Observable<number> = new Observable();
  totalItems$: Observable<any> = new Observable();

  ngOnInit() {
    this.limit$ = this.store.select(selectLimit);
    this.totalItems$ = this.store.select(selecTotalItems);
  }

  onPaginateChange(event: PageEvent) {
    this.store.dispatch(setLimit({ limit: event.pageSize }));
    const newPage = event.pageIndex + 1;

    this.store.dispatch(setPage({ page: newPage}));



  }

}
