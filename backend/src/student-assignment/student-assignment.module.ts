import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentAssignmentController } from './student-assignment.controller';
import { StudentAssignmentService } from './student-assignment.service';
import {
  StudentAssignment,
  StudentAssignmentSchema,
} from './schemas/student-assignment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentAssignment.name, schema: StudentAssignmentSchema },
    ]),
  ],
  controllers: [StudentAssignmentController],
  providers: [StudentAssignmentService],
  exports: [StudentAssignmentService],
})
export class StudentAssignmentModule {}
