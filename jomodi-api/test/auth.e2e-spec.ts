import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/auth/auth.module';
import { DatabaseCleanupService } from './../src/database/database-cleanup.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dbCleanupService: DatabaseCleanupService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dbCleanupService = app.get<DatabaseCleanupService>(DatabaseCleanupService);
    await dbCleanupService.cleanUpDatabase();
  });

  afterEach(async () => {
    dbCleanupService = app.get<DatabaseCleanupService>(DatabaseCleanupService);
    await dbCleanupService.cleanUpDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a user', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@user.com',
        password: 'test',
      })
      .expect(201);
  });

  it('should login a user', async () => {
    await request(app.getHttpServer()).post('/auth/signup').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@user.com',
      password: 'test',
    });
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'test@user.com',
        password: 'test',
      })
      .expect(200);
  });

  it('should not login a user with wrong password', async () => {
    await request(app.getHttpServer()).post('/auth/signup').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@user.com',
      password: 'test',
    });
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'test@user.com',
        password: 'wrong',
      })
      .expect(401);
  });
});
