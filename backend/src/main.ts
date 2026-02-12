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

// Vercel serverless handler
export default async (req: any, res: any) => {
  try {
    const app = await getApp();
    const instance = app.getHttpAdapter().getInstance();
    return instance(req, res);
  } catch (error) {
    console.error('Error in Vercel handler:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Keep the bootstrap for local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap().catch((err) => {
    console.error('Bootstrap error:', err);
    process.exit(1);
  });
}

app.enableCors({
  origin: 'https://webprog-guestbook-backend-nzyxwy0ej-chase-ian-s-projects.vercel.app/', // Replace with your real URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});