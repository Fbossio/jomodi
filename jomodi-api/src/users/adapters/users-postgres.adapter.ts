import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../ports/users-repository';
import { UserEntity } from '../schemas/users.schema';

@Injectable()
export class UsersPostgresAdapter implements UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create(user);
    try {
      await this.userRepository.save(createdUser);
      return new User(createdUser);
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users.map((user) => new User(user));
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: Number(id) },
      });
      return new User(user);
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) return null;
      return new User(user);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    try {
      await this.userRepository.update(id, user);
      const updatedUser = await this.userRepository.findOne({
        where: { id: Number(id) },
      });
      return new User(updatedUser);
    } catch (error) {
      throw error;
    }
  }
  async remove(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        relations: ['products'],
        where: { id: Number(id) },
      });

      await this.userRepository.delete(id);
      return new User(user);
    } catch (error) {
      throw error;
    }
  }
}
