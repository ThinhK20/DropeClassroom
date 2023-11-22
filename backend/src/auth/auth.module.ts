import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.auth';
import { UsersModule } from 'src/users/users.module';
import { SessionSerializer } from './session.serializer';
import { SendgridService } from 'src/sendgrid/sendgrid.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: 36000 },
    }),
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer, SendgridService],
  controllers: [AuthController],
})
export class AuthModule {}
