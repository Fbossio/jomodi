import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionPort } from '../common/ports/encription.port';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.entity';
import { UsersRepository } from './ports/users-repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<UsersRepository>;
  let encryptionPort: jest.Mocked<EncryptionPort>;

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
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

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      };

      jest.spyOn(encryptionPort, 'hashPassword').mockResolvedValue('');
      jest.spyOn(repository, 'findOneByEmail').mockResolvedValue(null as any);

      await service.create(createUserDto);

      expect(repository.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = []; // Provide an array of users for testing

      repository.findAll.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = {}; // Provide a user for testing

      repository.findOne.mockResolvedValue(user as any);

      const result = await service.findOne('1');

      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: CreateUserDto = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      };

      const updatedUser: User = {
        id: 1,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: UserRole.USER,
        createdAt: undefined,
        updatedAt: undefined,
      };

      const requestUser = {
        id: '1',
        email: '',
      };

      repository.update.mockResolvedValue(updatedUser);

      const result = await service.update('1', updateUserDto);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = {}; // Provide a user for testing
      const requestUser = {
        id: '1',
        email: '',
      };

      repository.remove.mockResolvedValue(user as any);

      const result = await service.remove('1');

      expect(result).toEqual(user);
    });
  });
});
