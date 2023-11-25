import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface UsersRepository {
  findOneByEmail(email: string): unknown;
  create(user: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  update(id: string, user: UpdateUserDto): Promise<User>;
  remove(id: string): Promise<User>;
}
