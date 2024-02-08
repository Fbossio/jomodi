import { createAction, props } from '@ngrx/store';
import { CreateOrderInterface, Order } from '../../core/models/order.interface';

export const createOrder = createAction(
  '[Order] Create Order',
  props<{ order: CreateOrderInterface }>()
)

export const createOrderSuccess = createAction(
  '[Order] Create Order Success',
  props<{ order: Order }>()
)

export const createOrderFailure = createAction(
  '[Order] Create Order Failure',
  props<{ error: any }>()
)

export const cancelOrder = createAction(
  '[Order] Cancel Order',
  props<{ orderId: string, payload:any }>()
)

export const cancelOrderSuccess = createAction(
  '[Order] Cancel Order Success',
  props<{ order: Order }>()
)

export const cancelOrderFailure = createAction(
  '[Order] Cancel Order Failure',
  props<{ error: any }>()
)
