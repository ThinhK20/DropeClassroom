import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from './guards/public.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async signIn(@Request() req) {
    //return this.authService.signIn(signInDto.username, signInDto.password);
    return await this.authService.generateJwtToken(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('public')
  getPublicResource() {
    return 'public';
  }
}
