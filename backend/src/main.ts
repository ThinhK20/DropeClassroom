import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'secretKey',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 86400000, // 1 day
        secure: true,
        sameSite: 'none',
        httpOnly: false,
        path: '/',
      },
    }),
  );

  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: process.env.CLIENT_URL, // Replace with your ReactJS client's origin
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();
