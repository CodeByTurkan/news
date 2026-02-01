import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('News')
    .setDescription('The News API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('User', 'User management')
    .addTag('News', 'News endpoints')
    .addTag('Category', 'Categories')
    .addTag('Auth', 'Authentication(login, register)')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
  console.log(`App running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
