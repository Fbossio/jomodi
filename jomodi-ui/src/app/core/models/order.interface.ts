interface Detail {
  id: number;
  quantity: number;
  price: number;
  product: string;
}

interface Costs {
  id: number;
  subtotal: number;
  shippingCost: number;
  tax: number;
  totalCost: number;
}

interface BillingAddress {
  id: number;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  data: {
    id: number;
    status: string;
    firstName: string;
    lastName: string;
    email: string;
    details: Detail[];
    costs: Costs;
    billingAddress: BillingAddress;
  },


}

export interface CreateOrderInterface {
  details: OrderItem[];
}
