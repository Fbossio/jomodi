import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { AddressPostgresAdapter } from './adapters/address-postgres.adapter';
import { UsersPostgresAdapter } from './adapters/users-postgres.adapter';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressEntity } from './schemas/address.schema';
import { UserEntity } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AddressEntity]),
    CommonModule,
  ],
  controllers: [UsersController, AddressController],
  providers: [
    UsersService,
    AddressService,
    {
      provide: 'UsersRepository',
      useClass: UsersPostgresAdapter,
    },
    {
      provide: 'AddressRepository',
      useClass: AddressPostgresAdapter,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
