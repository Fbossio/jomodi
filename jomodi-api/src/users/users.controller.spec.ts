import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@john.com',
          password: '12345',
        },
      ];
      jest.spyOn(usersService, 'findAll').mockResolvedValue(users as any);

      expect(await controller.findAll()).toBe(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@john.com',
        password: '12345',
      };
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user as any);

      expect(await controller.findOne('1')).toBe(user);
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const updateUserDto: UpdateUserDto = { firstName: 'Jane Doe' };
      const updatedUser = { id: '1', firstName: 'Jane Doe' };
      const request = { user: { id: '1' } };
      jest.spyOn(usersService, 'update').mockResolvedValue(updatedUser as any);

      expect(await controller.update('1', updateUserDto, request as any)).toBe(
        updatedUser,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const user = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@john.com',
        password: '12345',
      };
      const request = { user: { id: '1' } };
      jest.spyOn(usersService, 'remove').mockResolvedValue(user as any);

      expect(await controller.remove('1', request as any)).toBe(user);
    });
  });
});
