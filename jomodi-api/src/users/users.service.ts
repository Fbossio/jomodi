import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { EncryptionPort } from '../common/ports/encription.port';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './ports/users-repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    @Inject('EncryptionPort')
    private readonly encryptionPort: EncryptionPort,
  ) {}

  async checkPassword(password: string, hashedPassword: string) {
    return this.encryptionPort.comparePassword(password, hashedPassword);
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneByEmail(createUserDto.email);
    if (user !== null) {
      throw new Error('User already exists');
    }
    const hashedPassword = await this.encryptionPort.hashPassword(
      createUserDto.password,
    );
    const userToCreate = {
      ...createUserDto,
      password: hashedPassword,
    };
    return this.usersRepository.create(userToCreate);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneByEmail(email);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    user: any,
  ): Promise<User> {
    if (id !== user.id) {
      throw new UnauthorizedException();
    }
    if ('role' in updateUserDto) {
      throw new UnauthorizedException();
    }
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string, user: any): Promise<User> {
    if (id !== user.id) {
      throw new UnauthorizedException();
    }
    return this.usersRepository.remove(id);
  }
}