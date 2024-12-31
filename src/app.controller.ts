import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  getUsers(): User[] {
    return [{ name: 'user1' }, { name: 'user2' }];
  }

  @Get('products/:id')
  getOneProduct(@Param('id') id: string) {
    return `Product id: ${id}`;
  }

  @Get('products')
  getProducts(@Query('limit') limit: string, @Query('offset') offset: string) {
    return `Products limit: ${limit}, offset: ${offset}`;
  }
}
