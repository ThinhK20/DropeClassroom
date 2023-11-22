import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/schemas/user.schema';
import { generateToken } from 'src/utils/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByQuery({ email });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('Could not find the user.');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(createUserDto: User) {
    const salfOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      salfOrRounds,
    );
    createUserDto.password = hashedPassword;
    const createdUser = await this.usersService.createNewUser(createUserDto);
    return createdUser;
  }

  async initiatePasswordReset(email: string): Promise<string> {
    const user = await this.usersService.getUserByQuery({ email });

    if (user) {
      const resetToken = generateToken();
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1); // Set expiration time (e.g., 1 hour)
      await this.usersService.saveResetToken(
        user._id.toString(),
        resetToken,
        expirationDate as any,
      );

      return resetToken;
    }

    return null;
  }

  async validateResetToken(userId: string, token: string): Promise<boolean> {
    const user = await this.usersService.getUserByQuery({ _id: userId });

    if (
      user &&
      user.resetToken === token &&
      (user.resetTokenExpirationDate as any) > new Date()
    ) {
      return true;
    }
    return false;
  }

  async generateRenewPasswordLink(
    userId: string,
    newPassword: string,
    token: string,
  ) {
    return `http://localhost:3000/auth/reset-password?token=${token}&id=${userId}&password=${newPassword}`;
  }
}
