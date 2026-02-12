import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

// This variable will store our app so we don't reboot it every time
let cachedApp: INestApplication;

async function bootstrapServer(): Promise<any> {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    app.enableCors(); // Leave this open for now to ensure it works
    await app.init();
    cachedApp = app;
  }
  return cachedApp.getHttpAdapter().getInstance();
}

// Export the handler for Vercel
export default async (req: any, res: any) => {
  const proxyServer = await bootstrapServer();
  return proxyServer(req, res);
};

// Local development support
if (process.env.NODE_ENV !== 'production') {
  async function startLocal() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3000);
  }
  startLocal();
}