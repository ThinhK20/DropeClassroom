import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.auth';
import { UsersModule } from 'src/users/users.module';
import { SessionSerializer } from './session.serializer';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: 3600000 }, // 1 hour
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    SendgridService,
    RolesGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
