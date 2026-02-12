import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly service: GuestbookService) {}

  @Get() getAll() { return this.service.findAll(); }
  
  @Post() create(@Body() body: { name: string, message: string }) { 
    return this.service.create(body); 
  }

  @Put(':id') update(@Param('id') id: string, @Body('message') message: string) {
    return this.service.update(id, message);
  }

  @Delete(':id') remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}