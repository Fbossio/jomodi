import { createSelector } from '@ngrx/store';
import { PaymentIntentState } from '../../core/models/paymentIntent.interface';
import { AppState } from '../app.state';

export const selectPaymentIntentFeature = (state: AppState) => state.clientSecret;

export const selectClientSecret = createSelector(
  selectPaymentIntentFeature,
  (state: PaymentIntentState) => state
);

