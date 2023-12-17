import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderRepository } from './ports/order-port';
import { OrderSerializerPort } from './ports/order-serializer-port';

describe('OrdersController', () => {
  let controller: OrdersController;
  let ordersService: jest.Mocked<OrdersService>;
  let orderRepository: jest.Mocked<OrderRepository>;
  let orderSerializer: jest.Mocked<OrderSerializerPort>;

  beforeEach(async () => {
    orderRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      ordersByUser: jest.fn(),
    };
    orderSerializer = {
      serializeOrder: jest.fn(),
    };
    ordersService = new OrdersService(
      orderRepository,
      orderSerializer,
    ) as jest.Mocked<OrdersService>;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: ordersService,
        },
        {
          provide: 'OrderRepository',
          useValue: orderRepository,
        },
        {
          provide: 'OrderSerializerPort',
          useValue: orderSerializer,
        },
        {
          provide: 'OrderRepository',
          useValue: orderRepository,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an order', async () => {
      const order = {
        id: '1',
        userId: '1',
        products: [],
        total: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      orderRepository.create.mockResolvedValue(order as any);
      orderSerializer.serializeOrder.mockResolvedValue(order);
      const req = {
        user: {
          id: '1',
        },
      } as any;
      const result = await controller.create(order as any, req);
      expect(result).toEqual(order);
    });
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const order = {
        id: '1',
        userId: '1',
        products: [],
        total: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      orderRepository.findAll.mockResolvedValue([order] as any);
      orderSerializer.serializeOrder.mockReturnValue(order);
      const result = await controller.findAll();
      expect(result).toEqual([order]);
    });
  });

  describe('findOne', () => {
    it('should return an order', async () => {
      const order = {
        id: '1',
        userId: '1',
        products: [],
        total: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      orderRepository.findOne.mockResolvedValue(order as any);
      orderSerializer.serializeOrder.mockReturnValue(order);
      const result = await controller.findOne('1');
      expect(result).toEqual(order);
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const order = {
        id: '1',
        userId: '1',
        products: [],
        total: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      orderRepository.update.mockResolvedValue(order as any);
      orderSerializer.serializeOrder.mockReturnValue(order);
      const result = await controller.update('1', order as any);
      expect(result).toEqual(order);
    });
  });

  describe('remove', () => {
    it('should remove an order', async () => {
      const order = {
        id: '1',
        userId: '1',
        products: [],
        total: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      orderRepository.remove.mockResolvedValue(order as any);
      orderSerializer.serializeOrder.mockReturnValue(order);
      const result = await controller.remove('1');
      expect(result).toEqual(order);
    });
  });
});
