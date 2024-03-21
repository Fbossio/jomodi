import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { OrderStatus } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post('stripe-webhooks')
  @ApiExcludeEndpoint()
  @HttpCode(HttpStatus.OK)
  async handleStripeWebhook(
    @Body() body: any,
    @Headers('stripe-signature') signature: string,
  ) {
    const eventType = body.type;
    const paymentIntent = body.data.object;
    const orderId = paymentIntent.metadata.orderId;
    const paymentId = paymentIntent.id;
    await this.ordersService.updatePayment(orderId, paymentId);

    switch (eventType) {
      case 'payment_intent.succeeded':
        const succeededPaymentIntent = body.data.object;
        const orderIdSucceeded = succeededPaymentIntent.metadata.orderId;
        // Update order status in the database
        const updateSucceed = {
          status: OrderStatus.IN_PROGRESS,
        };
        await this.ordersService.update(orderIdSucceeded, updateSucceed);
        break;

      case 'payment_intent.canceled':
        const canceledPaymentIntent = body.data.object;
        const orderIdCanceled = canceledPaymentIntent.metadata.orderId;
        // Update order status in the database
        const updateCancel = {
          status: OrderStatus.CANCELLED,
        };
        await this.ordersService.update(orderIdCanceled, updateCancel);
        break;

      case 'payment_intent.payment_failed':
        // Manage a failed PaymentIntent
        const failedPaymentIntent = body.data.object;
        const orderIdFailed = failedPaymentIntent.metadata.orderId;
        // Update order status in the database
        const updateFailed = {
          status: OrderStatus.CANCELLED,
        };
        await this.ordersService.update(orderIdFailed, updateFailed);
        break;
    }

    return { received: true };
  }

  @Post(':orderId')
  async createPaymentIntent(@Param('orderId') orderId: string) {
    const order = await this.ordersService.findOne(orderId);
    const charge = await this.ordersService.prepareStripeCharge(order);
    const paymentIntent = await this.paymentsService.createPaymentIntent(
      charge,
    );
    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}
