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

  serializeCheckout(order: any) {
    const { details, costs, billingAddress, ...otherData } = order;
    const orderObject = { ...otherData };
    const serializedOrder = {
      intent: 'CAPTURE',
      purchase_units: [],
      application_context: {
        brand_name: 'Jomodi',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: 'http://localhost:3000/orders',
      },
    };
  }
}
