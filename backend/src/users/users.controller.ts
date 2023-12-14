import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SessionGuard } from 'src/auth/guards/session.guard';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { User } from 'src/shared/schemas/user.schema';
import { GetUserDto } from './dto';

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

  // Get user not in array
  @UseGuards(SessionGuard)
  @Post('/u/nic')
  async getAllUserNotIn(@Body() users: GetUserDto): Promise<User[]> {
    return this.usersService.getAllUserNotIn(users);
  }
}
