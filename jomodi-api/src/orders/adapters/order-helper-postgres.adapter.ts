import { OrderHelperPort } from '../ports/order-helper-port';

export class OrderHelperPostgresAdapter implements OrderHelperPort {
  getTotal(orderDetails: any[]): number {
    return orderDetails.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }
}
