import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.usersService.sayHello();
  }

  @Post('signup')
  async createNewUser(@Body() createUserDto: User): Promise<User> {
    const salfOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      salfOrRounds,
    );
    createUserDto.password = hashedPassword;
    const createdUser = await this.usersService.createNewUser(createUserDto);
    return createdUser;
  }
}
