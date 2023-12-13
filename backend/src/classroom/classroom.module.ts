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
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService, ClassroomRepository],
  exports: [ClassroomService],
})
export class ClassroomModule {}
