import 'source-map-support/register';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { PORT } from './config/configuration';

async function bootstrap() {
  
  // to activate SSL
  const httpsOptions = {
    key:  fs.readFileSync('src/cert/laruno.id.key'),
    cert: fs.readFileSync('src/cert/laruno.id.pem'),
    requestCert: false,
    rejectUnauthorized: false
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});

  // app.enableCors();
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.useWebSocketAdapter(new WsAdapter(app) as any);

  // Swagger API Documentation
  const options = new DocumentBuilder()
    .setTitle('FireInspection')
    .setDescription(`API ${process.env.NODE_ENV}.`)
    .setVersion('1.0')
    // .addBearerAuth({ type: "apiKey", in: "header", name: "Authorization", description: "HTTP/HTTP Bearer" })
    .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT", description: "HTTP/HTTP Bearer" })
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, options);    
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT);

  Logger.log(`[API] is running at http://localhost:${PORT}/api/docs`)
}
bootstrap();
