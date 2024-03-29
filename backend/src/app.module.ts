import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomModule } from './classroom/classroom.module';
import { AssignmentModule } from './assignments/assignments.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { SendgridService } from './sendgrid/sendgrid.service';
import { MailController } from './mail/mail.controller';
import { UserClassroomModule } from './user-classroom/user-classroom.module';
import { StudentAssignmentModule } from './student-assignment/student-assignment.module';
import { NotificationModule } from './notification/notification.module';
import { GradeReviewsModule } from './grade-reviews/grade-reviews.module';
import { GradeReviewsController } from './grade-reviews/grade-reviews.controller';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    UsersModule,
    PassportModule,
    ClassroomModule,
    AssignmentModule,
    AuthModule,
    UserClassroomModule,
    StudentAssignmentModule,
    NotificationModule,
    GradeReviewsModule,
    CommentsModule,
  ],
  controllers: [AppController, MailController, GradeReviewsController],
  providers: [AppService, SendgridService],
})
export class AppModule {}
