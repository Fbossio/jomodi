import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { ItemsService } from '../../services/Items.service';
import { AuthService } from '../../services/auth.service';
import { alert } from '../../utils/alert';
import {
  createItem,
  createItemFailure,
  createItemSuccess,
  loadItem,
  loadItemSuccess,
  loadItems,
  loadItemsFailure,
  loadItemsSuccess,
  updateItem,
  updateItemFailure,
  updateItemSuccess
} from '../actions/itmems.actions';
import { setLimit, setPage } from '../actions/pagination.actions';
import { AppState } from '../app.state';
import { selectLimit, selectPage } from '../selectors/pagination.selector';

@Injectable()
export class ItemsEffect {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private itemsService: ItemsService,
    private authService: AuthService
  ) {}

  loadItems$ = createEffect(() => this.actions$.pipe(
    ofType(loadItems, setPage, setLimit),
    withLatestFrom(
      this.store.pipe(select(selectPage)),
      this.store.pipe(select(selectLimit))
    ),
    mergeMap(([, page, limit]) =>
      this.itemsService.getItems(page, limit)
        .pipe(
          map(data => loadItemsSuccess({ items: data.items, meta: data.meta })),
          catchError(error => of(loadItemsFailure({ error })))
        )),
    )
  );

  loadItem$ = createEffect(() => this.actions$.pipe(
    ofType(loadItem),
    exhaustMap(({id}) => this.itemsService.getItem(id)
      .pipe(
        map(item => loadItemSuccess({ item })),
        catchError(error => of(loadItemsFailure({ error })))
      )
  )),
  );

  updateItem$ = createEffect(() => this.actions$.pipe(
    ofType(updateItem),
    exhaustMap(({id, item}) =>
      this.itemsService.updateItem(id, item, this.authService.getHeaders()).pipe(
        map(item => {
          alert('Success', 'Item updated successfully', 'success');
          return updateItemSuccess({ item })
        }),
        catchError((error) => {
          alert('Error', 'Error updating item', 'error');
          return of(updateItemFailure({ error }));
        })
      )
    )
  ));

  createItem$ = createEffect(() => this.actions$.pipe(
    ofType(createItem),
    exhaustMap(({item}) =>
      this.itemsService.createItem(item, this.authService.getHeaders()).pipe(
        map(item => {
          alert('Success', 'Item created successfully', 'success');
          return createItemSuccess({ item })
        }),
        catchError((error) => {
          alert('Error', 'Error creating item', 'error');
          return of(createItemFailure({ error }));
        })
      )
    )
  ));
}

