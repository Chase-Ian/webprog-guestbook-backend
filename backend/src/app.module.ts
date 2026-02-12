import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GuestbookModule } from './guestbook/guestbook.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GuestbookModule],
  controllers: [AppController], // This is what shows "Hello World"
  providers: [AppService],
})
export class AppModule {}