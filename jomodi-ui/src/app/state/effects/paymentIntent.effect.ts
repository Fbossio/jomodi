import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { PaymentService } from '../../services/payment.service';
import {
  createPaymentIntent,
  createPaymentIntentFailure,
  createPaymentIntentSuccess,
} from '../actions/paymentIntent.actions';

@Injectable()
export class PaymentIntentEffect {
  createPaymentIntent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPaymentIntent),
      exhaustMap(({ orderId }) =>
        this.paymentService.createPaymentIntent(orderId).pipe(
          map((response) =>
            createPaymentIntentSuccess({ clientSecret: response })          ),
          catchError((error) => of(createPaymentIntentFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private paymentService: PaymentService
  ) {}
}
