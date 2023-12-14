import { OrderSerializerPort } from '../ports/order-serializer-port';

export class OrderSerializerPostgresAdapter implements OrderSerializerPort {
  serializeOrder(order: any) {
    const { details, costs, billingAddress, ...otherData } = order;
    const orderObject = { ...otherData };
    const serializedOrder = {
      data: {
        id: orderObject.id,
        status: orderObject.status,
        firstName: orderObject.firstName,
        lastName: orderObject.lastName,
        email: orderObject.email,
        total: orderObject.total,
        details: [],
        costs: {},
        billingAddress: {},
      },
    };
    const serializedDetails = details.map((detail) => {
      return {
        id: detail.id,
        quantity: detail.quantity,
        price: detail.price,
        product: detail.product.name,
      };
    });
    const serializedCosts = {
      id: costs.id,
      subtotal: costs.subtotal,
      shippingCost: costs.shippingCost,
      tax: costs.tax,
      totalCost: costs.totalCost,
    };
    const serializedBillingAddress = {
      id: billingAddress.id,
      address: billingAddress.address,
      city: billingAddress.city,
      zipCode: billingAddress.zip,
      country: billingAddress.country,
    };
    serializedOrder.data.details = serializedDetails;
    serializedOrder.data.costs = serializedCosts;
    serializedOrder.data.billingAddress = serializedBillingAddress;
    return serializedOrder;
  }
}
