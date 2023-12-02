import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const isValidPassword = await this.usersService.checkPassword(
      password,
      user.password,
    );

    return isValidPassword ? user : null;
  }

  async signin(user: SigninDto) {
    const registeredUser = await this.validateUser(user.email, user.password);
    if (!registeredUser) throw new Error('Invalid credentials');
    try {
      const payload = {
        email: registeredUser.email,
        sub: registeredUser.id,
        role: registeredUser.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async signUp(user: CreateUserDto) {
    const newUser = await this.usersService.create(user);
    const payload = {
      email: newUser.email,
      sub: newUser.id,
      role: newUser.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
