import { Inject, Injectable } from '@nestjs/common';
import { EncryptionPort } from '../common/ports/encription.port';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
    if (user) {
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

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: number) {
    return this.usersRepository.findOne(id.toString());
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id.toString(), updateUserDto);
  }

  async remove(id: number) {
    return this.usersRepository.remove(id.toString());
  }
}
