import { OrderHelperPort } from '../ports/order-helper-port';

export class OrderHelperPostgresAdapter implements OrderHelperPort {
  getTax(): number {
    return 0.18;
  }
  getShippingCost(subtotal: number): number {
    return subtotal > 1000 ? 0 : 100;
  }
  getTotal(subtotal: number, shippingCost: number, tax: number): number {
    return subtotal + shippingCost + tax * subtotal;
  }
  getsubTotal(orderDetails: any[]): number {
    return orderDetails.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }
}
