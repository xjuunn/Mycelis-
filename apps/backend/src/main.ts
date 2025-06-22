import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AllExceptionsFilter } from './f/AllExceptionsFilter';
import { ValidationPipe } from '@nestjs/common';
import { getConfig } from '@mycelis/config';
import { startPeerServer } from './peer-server';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Mycelis')
    .setDescription('Mycelis document')
    .setVersion('1.0')
    .addTag('mycelis')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'api/json',
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  await app.listen(getConfig('SERVER_PORT') ?? 8080, () => {
    console.log(`🦊 API 服务已在 ${getConfig('SERVER_PORT') ?? 8080} 端口监听`);
  });
  startPeerServer(Number(getConfig('PEER_SERVER_PORT')) ?? 9000);
}

bootstrap();
