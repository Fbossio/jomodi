import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseCleanupService } from './database-cleanup.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('database.host'),
        port: configService.getOrThrow('database.port'),
        database: configService.getOrThrow('database.database'),
        username: configService.getOrThrow('database.username'),
        password: configService.getOrThrow('database.password'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('database.synchronize'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseCleanupService],
})
export class DatabaseModule {}
