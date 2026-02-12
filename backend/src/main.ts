import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let app;

async function getApp() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors();
  }
  return app;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}

export default async (req: any, res: any) => {
  const app = await NestFactory.create(AppModule);
  
  // Explicitly configure CORS here for Vercel
  app.enableCors({
    origin: 'https://webprog-guestbook-frontend-98nhund6g-chase-ian-s-projects.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.init(); // Important for serverless!
  
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
};

// Keep the bootstrap for local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap().catch((err) => {
    console.error('Bootstrap error:', err);
    process.exit(1);
  });
}
