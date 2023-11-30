import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
// import { SigninDto } from './dto/signin.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            async findOneByEmail(email: string) {
              return {
                id: 1,
                email: email,
                password: 'password',
              };
            },
            async create(user: CreateUserDto) {
              return {};
            },
            async checkPassword(password: string, hashedPassword: string) {
              return true;
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            async sign(payload: any) {
              return 'token';
            },
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should validate user credentials', async () => {
      const email = 'test@example.com';
      const password = 'password';
      jest
        .spyOn(usersService, 'findOneByEmail')
        .mockResolvedValue({ email, password } as any);
      const result = await authService.validateUser(email, password);
      expect(result).toEqual({ email, password });
    });
  });

  describe('signin', () => {
    it('should sign in a user', async () => {
      const user: SigninDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const result = await authService.signin(user);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('access_token');
    });
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const user: CreateUserDto = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password',
      };

      const result = await authService.signUp(user);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('access_token');
    });
  });
});
