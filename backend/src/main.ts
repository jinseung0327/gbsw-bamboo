
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('개발을 위한 api독스 입니다.')
    .setVersion('1.0')
    .addBasicAuth()
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
    app.enableCors();

  await app.listen(3000);
}
bootstrap();
