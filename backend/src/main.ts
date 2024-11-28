import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const FE_URL = 'http://localhost:3000'
  
  app.enableCors({
    origin: FE_URL,
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'multipart/form-data']
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
