import { Controller, Get } from '@nestjs/common';
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
}
