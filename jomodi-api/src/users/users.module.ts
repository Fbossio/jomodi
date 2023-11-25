import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersPostgresAdapter } from './adapters/users-postgres.adapter';
import { UserEntity } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UsersRepository',
      useClass: UsersPostgresAdapter,
    },
  ],
})
export class UsersModule {}
