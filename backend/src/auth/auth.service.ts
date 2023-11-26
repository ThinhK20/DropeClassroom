import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
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
    const passwordValid = await this.validatePassword(password, user.password);
    if (!user) {
      throw new NotAcceptableException('Could not find the user.');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(userLogin: { email: string; password: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.usersService.getUserByQuery({
      email: userLogin.email,
    } as User);

    return user;
  }

  async signup(createUserDto: User) {
    const existedUser = await this.usersService.getUserByQuery({
      email: createUserDto.email,
    } as User);
    if (existedUser) throw new BadRequestException('Email already exists');

    const salfOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      salfOrRounds,
    );
    createUserDto.password = hashedPassword;
    const createdUser = await this.usersService.createNewUser(createUserDto);
    return createdUser;
  }

  async validatePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
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

  generateRenewPasswordLink(
    userId: string,
    newPassword: string,
    token: string,
  ) {
    return `http://localhost:8000/auth/reset-password?token=${token}&id=${userId}&password=${newPassword}`;
  }

  generateActivateAccountLink(userId: string) {
    return `http://localhost:8000/auth/active-account?id=${userId}`;
  }
}
