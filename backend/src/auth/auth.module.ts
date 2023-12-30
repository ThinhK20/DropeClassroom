import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.auth';
import { UsersModule } from 'src/users/users.module';
import { SessionSerializer } from './session.serializer';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { RolesGuard } from './guards/roles.guard';
import { GoogleStrategy } from './google.auth';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    PassportModule.register({ session: true }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    SendgridService,
    RolesGuard,
    GoogleStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
