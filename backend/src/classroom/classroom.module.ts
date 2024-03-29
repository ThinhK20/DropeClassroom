import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';
import {
  Classroom,
  ClassroomSchemaFactory,
} from 'src/classroom/schemas/classroom.schema';
import {
  UserClassroom,
  UserClassroomSchema,
} from 'src/user-classroom/schemas/user-classroom.schema';
import { UserClassroomModule } from 'src/user-classroom/user-classroom.module';
import { ClassroomRepository } from './repositories/classroom.repository';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { StudentAssignmentModule } from 'src/student-assignment/student-assignment.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Classroom.name,
        useFactory: ClassroomSchemaFactory,
        inject: [getModelToken(UserClassroom.name)],
        imports: [
          MongooseModule.forFeature([
            { name: UserClassroom.name, schema: UserClassroomSchema },
          ]),
        ],
      },
    ]),
    UserClassroomModule,
    StudentAssignmentModule,
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService, ClassroomRepository, SendgridService],
  exports: [ClassroomService],
})
export class ClassroomModule {}
