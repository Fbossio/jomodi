import { OrderSerializerPort } from '../ports/order-serializer-port';

export class OrderSerializerPostgresAdapter implements OrderSerializerPort {
  serializeOrder(order: any) {
    const { details, ...otherData } = order;
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
    serializedOrder.data.details = serializedDetails;
    return serializedOrder;
  }
}
