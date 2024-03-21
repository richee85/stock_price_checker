import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Stock Price Checker API')
    .setDescription('Stock Price Checker API definition')
    .setVersion('1.0.0')
    .build();
  const documentOptions = {
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, config, documentOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
