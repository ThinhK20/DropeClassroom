import { Module } from '@nestjs/common';
import { UserClassroomController } from './user-classroom.controller';
import { UserClassroomService } from './user-classroom.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserClassroom,
  UserClassroomSchema,
} from './schemas/user-classroom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserClassroom.name, schema: UserClassroomSchema },
    ]),
  ],
  controllers: [UserClassroomController],
  providers: [UserClassroomService],
  exports: [UserClassroomService],
})
export class UserClassroomModule {}
