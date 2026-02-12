import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // The '0.0.0.0' tells Nest to listen on every available network interface
  await app.listen(3000); 
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

