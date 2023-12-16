import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderRepository } from './ports/order-port';
import { OrderSerializerPort } from './ports/order-serializer-port';

describe('OrdersService', () => {
  let service: OrdersService;
  let OrderRepository: jest.Mocked<OrderRepository>;
  let OrderSerializerPort: jest.Mocked<OrderSerializerPort>;

  beforeEach(async () => {
    OrderRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      ordersByUser: jest.fn(),
    };
    OrderSerializerPort = {
      serializeOrder: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: 'OrderRepository',
          useValue: OrderRepository,
        },
        {
          provide: 'OrderSerializerPort',
          useValue: OrderSerializerPort,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      OrderRepository.create.mockResolvedValue(order as any);
      OrderSerializerPort.serializeOrder.mockResolvedValue(order);
      const result = await service.create(order as any);
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

      OrderRepository.findAll.mockResolvedValue([order] as any);
      OrderSerializerPort.serializeOrder.mockReturnValue(order);
      const result = await service.findAll();
      console.log(typeof result);
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
      OrderRepository.findOne.mockResolvedValue(order as any);
      OrderSerializerPort.serializeOrder.mockReturnValue(order);
      const result = await service.findOne('1');
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
      OrderRepository.update.mockResolvedValue(order as any);
      OrderSerializerPort.serializeOrder.mockReturnValue(order);
      const result = await service.update('1', order as any);
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
      OrderRepository.remove.mockResolvedValue(order as any);
      OrderSerializerPort.serializeOrder.mockReturnValue(order);
      const result = await service.remove('1');
      expect(result).toEqual(order);
    });
  });
});
