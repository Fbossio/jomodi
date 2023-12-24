import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../../products/products.service';
import { AddressService } from '../../users/address.service';
import { UsersService } from '../../users/users.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';
import { OrderCostsPort } from '../ports/order-costs-port';
import { OrderHelperPort } from '../ports/order-helper-port';
import { OrderRepository } from '../ports/order-port';
import { OrderEntity } from '../schemas/order.schema';
import { OrderDetailsPostgresAdapter } from './order-details-postgres.adapter';

@Injectable()
export class OrderPostgresAdapter implements OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @Inject('OrderHelperPort') private readonly orderHelper: OrderHelperPort,
    @Inject('OrderCostsPort') private readonly orderCostsPort: OrderCostsPort,
    private readonly orderDetailsAdapter: OrderDetailsPostgresAdapter,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly addressService: AddressService,
  ) {}
  async create(order: CreateOrderDto): Promise<Order> {
    // Split the order object into two objects: order and details
    const { details, ...otherData } = order;
    const orderObject = { ...otherData };
    const validDetails = [];
    // Check if the product has enough stock
    for (const detail of details) {
      const product = await this.productsService.findOne(
        detail.productId.toString(),
      );
      if (product.stock >= detail.quantity) {
        validDetails.push({
          ...detail,
          price: Number(product.price),
          product,
        });
      }
    }
    if (validDetails.length === 0) {
      throw new BadRequestException('No valid details');
    }
    // Add product price to the details
    const processedDetails = await Promise.all(
      validDetails.map(async (detail) => {
        const product = await this.productsService.findOne(
          detail.productId.toString(),
        );
        return {
          ...detail,
          price: Number(product.price),
        };
      }),
    );

    const user = await this.usersService.findOne(order.userId);
    orderObject.user = user;
    const createdOrder = this.orderRepository.create(orderObject);

    try {
      const billingAddress = await this.addressService.getDefaultAddress(
        user.id.toString(),
      );
      if (!billingAddress) {
        throw new BadRequestException('Please add a billing address');
      }
      const orderSaved = await this.orderRepository.save(createdOrder);
      const order = await this.findOne(orderSaved.id.toString());
      // Create order costs
      const subtotal = this.orderHelper.getsubTotal(processedDetails);
      const shippingCost = this.orderHelper.getShippingCost(subtotal);
      const tax = this.orderHelper.getTax();
      const total = this.orderHelper.getTotal(subtotal, shippingCost, tax);
      const orderCosts = await this.orderCostsPort.create({
        order: order,
        orderId: order.id,
        subtotal,
        shippingCost,
        tax,
        totalCost: total,
      });
      const orderDetails = await Promise.all(
        details.map(async (detail) => {
          const product = await this.productsService.findOne(
            detail.productId.toString(),
          );
          detail.product = product;
          detail.order = order;
          detail.price = Number(product.price);
          await this.productsService.subtractStock(
            product.id.toString(),
            detail.quantity,
          );
          return await this.orderDetailsAdapter.create(detail);
        }),
      );

      const orderCreated = new Order(createdOrder);

      return {
        ...orderCreated,
        details: orderDetails,
        costs: orderCosts,
        billingAddress,
      };
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.find({
        relations: ['user', 'orderCosts'],
      });
      const ordersDetails = await Promise.all(
        orders.map(async (order) => {
          const details = await this.orderDetailsAdapter.findByOrderId(
            order.id.toString(),
          );
          const costs = await this.orderCostsPort.findOne(order.id.toString());
          const billingAddress = await this.addressService.getDefaultAddress(
            order.user.id.toString(),
          );
          const orderCreated = new Order(order);
          return { ...orderCreated, details, costs, billingAddress };
        }),
      );
      return ordersDetails;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        relations: ['user', 'orderCosts'],
        where: { id: Number(id) },
      });
      if (!order) {
        throw new BadRequestException('Order not found');
      }
      const orderId = order.id;
      const details = await this.orderDetailsAdapter.findByOrderId(
        orderId.toString(),
      );
      const costs = await this.orderCostsPort.findOne(orderId.toString());
      const billingAddress = await this.addressService.getDefaultAddress(
        order.user.id.toString(),
      );

      const orderCreated = new Order(order);
      return { ...orderCreated, details, costs, billingAddress };
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, order: UpdateOrderDto): Promise<Order> {
    try {
      await this.orderRepository.update(id, order);
      const updatedOrder = await this.orderRepository.findOne({
        relations: ['user', 'orderCosts'],
        where: { id: Number(id) },
      });
      const orderId = updatedOrder.id;
      const details = await this.orderDetailsAdapter.findByOrderId(
        orderId.toString(),
      );
      const costs = await this.orderCostsPort.findOne(orderId.toString());
      const billingAddress = await this.addressService.getDefaultAddress(
        updatedOrder.user.id.toString(),
      );
      const orderCreated = new Order(updatedOrder);
      return { ...orderCreated, details, costs, billingAddress };
    } catch (error) {
      throw error;
    }
  }

  async updatePayment(id: string, paymentId: string): Promise<Order> {
    try {
      await this.orderRepository.update(id, { paymentId });
      const order = await this.orderRepository.findOne({
        relations: ['user', 'orderCosts'],
        where: { id: Number(id) },
      });
      const orderId = order.id;
      const details = await this.orderDetailsAdapter.findByOrderId(
        orderId.toString(),
      );
      const costs = await this.orderCostsPort.findOne(orderId.toString());
      const billingAddress = await this.addressService.getDefaultAddress(
        order.user.id.toString(),
      );
      const orderCreated = new Order(order);
      return { ...orderCreated, details, costs, billingAddress };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        relations: ['user', 'orderCosts'],
        where: { id: Number(id) },
      });
      if (!order) {
        throw new BadRequestException('Order not found');
      }
      const orderId = order.id;
      const details = await this.orderDetailsAdapter.findByOrderId(
        orderId.toString(),
      );
      const costs = await this.orderCostsPort.findOne(orderId.toString());
      const billingAddress = await this.addressService.getDefaultAddress(
        order.user.id.toString(),
      );
      const orderCreated = new Order(order);

      const removalOperations = [];
      removalOperations.push(
        this.orderDetailsAdapter.remove(order.id.toString()),
      );
      removalOperations.push(this.orderCostsPort.remove(order.id.toString()));

      await Promise.all(removalOperations);

      await this.orderRepository.delete(id);

      return { ...orderCreated, details, costs, billingAddress };
    } catch (error) {
      throw error;
    }
  }

  async ordersByUser(userId: string): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.find({
        relations: ['user', 'orderCosts'],
        where: { user: { id: Number(userId) } },
      });
      return orders.map((order) => new Order(order));
    } catch (error) {
      throw error;
    }
  }
}
