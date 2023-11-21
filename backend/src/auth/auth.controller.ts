import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localauth.guard';
import { SessionGuard } from './guards/session.guard';
import { User } from 'src/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Body() signUpUser: User) {
    return this.authService.signup(signUpUser);
  }

  @UseGuards(SessionGuard)
  @Get('protected')
  sayHello(@Request() req) {
    return req.user || 'Hello';
  }

  @UseGuards(SessionGuard)
  @Get('role')
  saySomethingWithRole(@Request() req) {
    return req.user.role;
  }
}
