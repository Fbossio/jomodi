import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ShowcaseServiceService } from '../../services/showcase-service.service';
import { loadItemsFailure, loadItemsSuccess } from '../actions/itmems.actions';

@Injectable()
export class ItemsEffect {

  loadItems$ = createEffect(() => this.actions$.pipe(
    ofType('[Item List] Load Items'),
    exhaustMap(() => this.showcaseServiceService.gedDataApi()
      .pipe(
        map(data => loadItemsSuccess({ items: data.items, meta: data.meta })),
        catchError(error => of(loadItemsFailure({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private showcaseServiceService: ShowcaseServiceService
  ) {}
}
