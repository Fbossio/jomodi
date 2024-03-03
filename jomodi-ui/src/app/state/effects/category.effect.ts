import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { alert } from '../../utils/alert';
import {
  createCategory,
  createCategoryFailure,
  createCategorySuccess,
  deleteCategory,
  deleteCategoryFailure,
  deleteCategorySuccess,
  loadCategories,
  loadCategoriesFailure,
  loadCategoriesSuccess,
  updateCategory,
  updateCategoryFailure,
  updateCategorySuccess
} from '../actions/category.actions';

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

  createCategory$ = createEffect(() => this.actions$.pipe(
    ofType(createCategory),
    exhaustMap(({ category }) => this.categoryService.createCategory(category, this.authService.getHeaders())
      .pipe(
        map(category => createCategorySuccess({ category })),
        catchError(error => of(createCategoryFailure({ error }))
        )
      ))

    )
  )

  updateCategory$ = createEffect(() => this.actions$.pipe(
    ofType(updateCategory),
    exhaustMap(({ id, category }) => this.categoryService.updateCategory(id, category, this.authService.getHeaders())
      .pipe(
        map(category => {
          alert('Success', 'Category updated successfully', 'success');
          return updateCategorySuccess({ category })
        }),
        catchError(error => {
          alert('Error', 'Error updating category', 'error');
          return of(updateCategoryFailure({ error }))
        }
        )
      ))

    )
  )

  deleteCategory$ = createEffect(() => this.actions$.pipe(
    ofType(deleteCategory),
    exhaustMap(({ id }) => this.categoryService.deleteCategory(id, this.authService.getHeaders())
      .pipe(
        map(() => {
          alert('Success', 'Category deleted successfully', 'success');
          return deleteCategorySuccess({ id })
        }),
        catchError(error =>{
          alert('Error', 'Error deleting category', 'error');
          return  of(deleteCategoryFailure({ error }))
        }
        )
      ))

    )
  )

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

}
