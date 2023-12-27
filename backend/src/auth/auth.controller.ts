/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  NotFoundException,
  Query,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localauth.guard';
import { SessionGuard } from './guards/session.guard';
import { UsersService } from 'src/users/users.service';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/shared/schemas/user.schema';

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
    return await this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Body() signUpUser: User) {
    const createdUser = await this.authService.signup(signUpUser);
    const activateAccountLink = this.authService.generateActivateAccountLink(
      createdUser._id.toString(),
    );
    await this.sendgridService.sendActivateAccountEmail(
      createdUser.email,
      activateAccountLink,
    );
    return 'Sign up successfully. Please active your account through the email we have sent to you.';
  }

  @UseGuards(SessionGuard)
  @Get()
  getUser(@Request() req: { user: User }) {
    return req.user;
  }

  @UseGuards(SessionGuard)
  @Get('role')
  saySomethingWithRole(@Request() req) {
    return req.user.role;
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    const user = await this.userService.getUserByQuery({ email: body.email });
    if (!user) throw new NotFoundException('User does not exists.');
    const token = await this.authService.initiatePasswordReset(user.email);
    const renewPasswordLink = await this.authService.generateRenewPasswordLink(
      user._id.toString(),
      token,
    );
    await this.sendgridService.sendRenewPasswordEmail(
      user.email,
      renewPasswordLink,
    );

    return "We've sent an email to renew password for you.";
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

  @Get('active-account')
  async activeAccount(@Query('id') userId) {
    const user = await this.userService.getUserByQuery({ _id: userId } as User);
    if (!user)
      throw new NotFoundException('Not found your account. Please try again !');
    await this.userService.activeUser(userId);
    return 'Your account has been successfully activated. You can now continue to use our services. Thanks for choosing Drope Classroom.';
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req, @Response() res) {
    const redirectUrl =
      req.query.redirect || `${process.env.CLIENT_URL}/signin`;
    const result = this.authService.googleLogin(req);
    const redirectWithAuthResult = `${redirectUrl}?authResult=${encodeURIComponent(
      JSON.stringify(result),
    )}`;

    return res.redirect(redirectWithAuthResult);
  }
}
