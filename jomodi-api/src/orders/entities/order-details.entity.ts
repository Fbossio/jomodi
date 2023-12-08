export class OrderDetails {
  id: number;
  quantity: number;
  price: number;
  product: any;
  order: any;
  productId: number;
  orderId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(orderDetails: Partial<OrderDetails>) {
    Object.assign(this, orderDetails);
  }
}
