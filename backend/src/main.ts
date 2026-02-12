import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}

// Vercel needs the app exported to handle serverless requests
export default async (req: any, res: any) => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const instance = await app.getHttpAdapter().getInstance();
  return instance(req, res);
};

// Keep the bootstrap for local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}