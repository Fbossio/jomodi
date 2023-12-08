export class CreateOrderDetailsDto {
  quantity: number;
  price?: number;
  product?: any;
  order?: any;
  productId: number;
  orderId?: number;
}
