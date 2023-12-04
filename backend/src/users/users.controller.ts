import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SessionGuard } from 'src/auth/guards/session.guard';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { User } from 'src/shared/schemas/user.schema';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.usersService.sayHello();
  }

  // Ham nay de test
  @UseGuards(SessionGuard)
  @Get('/me')
  async findOne(@GetUser() user: User) {
    // console.log(request.user);
    return user;
  }

  // user update info
}
