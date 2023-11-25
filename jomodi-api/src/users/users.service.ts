import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './ports/users-repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
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
