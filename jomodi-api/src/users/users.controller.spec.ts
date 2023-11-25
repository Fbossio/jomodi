import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionPort } from '../common/ports/encription.port';
import { UsersRepository } from './ports/users-repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: jest.Mocked<UsersService>;
  let encryptionPort: jest.Mocked<EncryptionPort>;
  let repository: jest.Mocked<UsersRepository>;

  beforeEach(async () => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      findOneByEmail: jest.fn(),
    };

    encryptionPort = {
      comparePassword: jest.fn(),
      hashPassword: jest.fn(),
    };

    const mockUsersService = {
      checkPassword: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: 'UsersRepository',
          useValue: repository,
        },
        {
          provide: 'EncryptionPort',
          useValue: encryptionPort,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
