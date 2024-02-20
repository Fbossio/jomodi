import { createReducer, on } from '@ngrx/store';
import { createPaymentIntent, createPaymentIntentFailure, createPaymentIntentSuccess } from '../actions/paymentIntent.actions';

export const initialState = {
  clientSecret: '',
};

export const paymentIntentReducer = createReducer(
  initialState,
  on(createPaymentIntent, state => ({ ...state })),
  on(createPaymentIntentSuccess, (state, { clientSecret }) => ({ ...state, clientSecret })),
  on(createPaymentIntentFailure, state => ({ ...state })),
);
