import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { ShowcaseServiceService } from '../../services/showcase-service.service';
import { loadItems, loadItemsFailure, loadItemsSuccess } from '../actions/itmems.actions';
import { setLimit, setPage } from '../actions/pagination.actions';
import { AppState } from '../app.state';
import { selectLimit, selectPage } from '../selectors/pagination.selector';

@Injectable()
export class ItemsEffect {

  loadItems$ = createEffect(() => this.actions$.pipe(
    ofType(loadItems, setPage, setLimit),
    withLatestFrom(
      this.store.pipe(select(selectPage)),
      this.store.pipe(select(selectLimit))
    ),
    mergeMap(([, page, limit]) =>
      this.showcaseServiceService.gedDataApi(page, limit)
        .pipe(
          map(data => loadItemsSuccess({ items: data.items, meta: data.meta })),
          catchError(error => of(loadItemsFailure({ error })))
        )),
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private showcaseServiceService: ShowcaseServiceService
  ) {}
}
