import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            async signin(ssigninDto: SigninDto) {
              return {};
            },
            async signUp(user: CreateUserDto) {
              return {};
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('Sign Up', () => {
    it('should return a user', async () => {
      const user = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@user.com',
        password: 'password',
      };
      jest.spyOn(authService, 'signUp').mockResolvedValue(user as any);
      expect(await controller.signup(user)).toBe(user);
    });
  });
  describe('Sign In', () => {
    it('should return a token', async () => {
      const signinDto = {
        email: 'test@user.com',
        password: 'password',
      };
      jest.spyOn(authService, 'signin').mockResolvedValue('token' as any);
      expect(await controller.signin(signinDto)).toBe('token');
    });
  });
});
