import { createAction, props } from '@ngrx/store';

export const createPaymentIntent = createAction(
  '[Payment] Create Payment Intent',
  props<{ orderId: string }>()
);

export const createPaymentIntentSuccess = createAction(
  '[Payment] Create Payment Intent Success',
  props<{ clientSecret: string }>()
);

export const createPaymentIntentFailure = createAction(
  '[Payment] Create Payment Intent Failure',
  props<{ error: any }>()
);

export const clearPaymentIntent = createAction(
  '[Payment] Clear Payment Intent'
);
