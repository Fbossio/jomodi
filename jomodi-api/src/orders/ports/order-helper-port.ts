export interface OrderHelperPort {
  getsubTotal(orderDetails: any): number;
  getTax(): number;
  getShippingCost(subtotal: number): number;
  getTotal(subtotal: number, shippingCost: number, tax: number): number;
}
