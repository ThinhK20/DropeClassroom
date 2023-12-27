import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SessionGuard } from 'src/auth/guards/session.guard';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { User } from 'src/shared/schemas/user.schema';
import { GetUserDto, UpdateUserDto } from './dto';
import { UserResponse } from 'src/shared/types/response.type';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/shared/enums';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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

  // Update User
  @Patch('/u')
  @UseGuards(SessionGuard)
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @GetUser() u: User,
    @Body() update: UpdateUserDto,
  ): Promise<UserResponse> {
    return this.usersService._updateUser(u, update);
  }

  // Inactive User
  @Roles(Role.Admin)
  @UseGuards(SessionGuard, RolesGuard)
  @Patch('/u/b')
  async inActiveUser(@Body('userId') u: string) {
    this.usersService._inActiveUser(u);
    return Role.Admin;
  }

  // Active User
  @Roles(Role.Admin)
  @UseGuards(SessionGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('/u/nb')
  async activeUser(@Body('userId') u: string) {
    this.usersService._activeUser(u);
    return Role.Admin;
  }

  // Get all user
  @Roles(Role.Admin)
  @UseGuards(SessionGuard, RolesGuard)
  @Get('/u/all')
  async getAllUser(@GetUser() u: User): Promise<UserResponse[]> {
    return this.usersService._getAllUser(u);
  }
}
