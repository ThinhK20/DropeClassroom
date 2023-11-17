import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.usersService.sayHello();
  }

  @Post()
  async createNewUser(@Body() createUserDto: User): Promise<User> {
    const createdUser = await this.usersService.createNewUser(createUserDto);
    return createdUser;
  }
}
