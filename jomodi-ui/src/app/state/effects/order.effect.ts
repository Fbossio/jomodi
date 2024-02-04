import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { OrdersService } from '../../services/orders.service';
import { createOrder, createOrderFailure, createOrderSuccess } from '../actions/order.actions';

@Injectable()
export class OrderEffect {

  createOrder$ = createEffect(() => this.actions$.pipe(
    ofType(createOrder),
    exhaustMap(({ order }) => this.ordersService.createOrder(order, this.authService.getHeaders())
      .pipe(
        map(order => createOrderSuccess({ order })),
        catchError(error => of(createOrderFailure({ error }))
        )
      ))

    )
  )

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService,
    private authService: AuthService
  ) {}

}
