import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentAssignmentController } from './student-assignment.controller';
import { StudentAssignmentService } from './student-assignment.service';
import {
  StudentAssignment,
  StudentAssignmentSchema,
} from './schemas/student-assignment.schema';
import {
  Assignment,
  AssignmentSchema,
} from 'src/shared/schemas/assignment.schema';
import {
  UserClassroom,
  UserClassroomSchema,
} from 'src/user-classroom/schemas/user-classroom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentAssignment.name, schema: StudentAssignmentSchema },
      { name: Assignment.name, schema: AssignmentSchema },
      { name: UserClassroom.name, schema: UserClassroomSchema },
    ]),
  ],
  controllers: [StudentAssignmentController],
  providers: [StudentAssignmentService],
  exports: [StudentAssignmentService],
})
export class StudentAssignmentModule {}
