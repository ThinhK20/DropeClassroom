import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localauth.guard';
import { SessionGuard } from './guards/session.guard';
import { User } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { SendgridService } from 'src/sendgrid/sendgrid.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private sendgridService: SendgridService,
  ) {}

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

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string; password: string }) {
    const user = await this.userService.getUserByQuery({ email: body.email });
    if (!user) throw new NotFoundException('User does not exists');
    const token = await this.authService.initiatePasswordReset(user.email);
    const renewPasswordLink = await this.authService.generateRenewPasswordLink(
      user._id.toString(),
      body.password,
      token,
    );
    await this.sendgridService.sendRenewPasswordEmail(
      user.email,
      renewPasswordLink,
    );
  }

  @Get('reset-password')
  async resetPassword(
    @Query('token') resetToken,
    @Query('id') userId,
    @Query('password') newPassword,
  ) {
    const isValid = this.authService.validateResetToken(userId, resetToken);
    if (isValid) {
      this.userService.updatePasswordById(userId, newPassword);
      this.userService.resetRenewToken(userId);
    }
    return 'Reset password successfully. You can close this tab now';
  }
}
