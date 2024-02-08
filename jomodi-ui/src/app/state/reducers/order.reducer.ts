import { createReducer, on } from '@ngrx/store';
import { OrderState } from '../../core/models/order.state';
import { cancelOrder, cancelOrderFailure, cancelOrderSuccess, createOrder, createOrderFailure, createOrderSuccess } from '../actions/order.actions';

export const initialState: OrderState = {
  order: {
    data: {
      id: 0,
      status: '',
      firstName: '',
      lastName: '',
      email: '',
      details: [
        {
          id: 0,
          quantity: 0,
          price: 0,
          product: '',
        },
      ],
      costs: {
        id: 0,
        subtotal: 0,
        shippingCost: 0,
        tax: 0,
        totalCost: 0,
      },
      billingAddress: {
        id: 0,
        address: '',
        city: '',
        zipCode: '',
        country: '',
      },
    },
  }
};

export const orderReducer = createReducer(
  initialState,
  on(createOrder, state => ({ ...state })),
  on(createOrderSuccess, (state, { order }) => ({ ...state, order })),
  on(createOrderFailure, state => ({ ...state })),
  on(cancelOrder, state => ({ ...state })),
  on(cancelOrderSuccess, (state, { order }) => ({ ...state, order })),
  on(cancelOrderFailure, state => ({ ...state })),
);
