import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { loadCategories, loadCategoriesFailure, loadCategoriesSuccess } from '../actions/category.actions';

@Injectable()
export class CategoryEffect {

  loadCategories$ = createEffect(() => this.actions$.pipe(
    ofType(loadCategories),
    exhaustMap(() => this.categoryService.getCategories()
      .pipe(
        map(categories => loadCategoriesSuccess({ categories })),
        catchError(error => of(loadCategoriesFailure({ error }))
        )
      ))

    )
  )

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}

}
