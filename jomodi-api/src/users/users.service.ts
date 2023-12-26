import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    private configService: ConfigService,
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if ('role' in updateUserDto) {
      throw new UnauthorizedException();
    }
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    return this.usersRepository.remove(id);
  }

  async changeToAdmin(id: string): Promise<User> {
    if (this.configService.get('NODE_ENV') !== 'testing') {
      throw new Error('Thid method can only be used in testing environment');
    }
    return this.usersRepository.changeToAdmin(id);
  }
}
