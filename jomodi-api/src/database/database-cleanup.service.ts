import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class DatabaseCleanupService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private configService: ConfigService,
  ) {}

  async cleanUpDatabase() {
    if (this.configService.get('NODE_ENV') !== 'testing') {
      throw new Error(
        'You can only clean up the database in the testing environment.',
      );
    }
    const entities = this.entityManager.connection.entityMetadatas;

    for (const entity of entities) {
      const repository = this.entityManager.getRepository(entity.name);
      await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`);
    }
  }
}
