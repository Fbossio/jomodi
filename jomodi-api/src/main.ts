import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Jomodi API')
    .setDescription('API for Jomodi application.')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addServer(
      'http://jomodi-api-dev.us-east-1.elasticbeanstalk.com/',
      'Production',
    )
    .addTag('jomodi')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
