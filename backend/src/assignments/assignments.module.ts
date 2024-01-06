import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignmentController } from './assignments.controller';
import { AssignmentService } from './assignments.service';
import {
  Assignment,
  AssignmentSchema,
} from 'src/shared/schemas/assignment.schema';
import {
  StudentAssignment,
  StudentAssignmentSchema,
} from 'src/student-assignment/schemas/student-assignment.schema';
import { ClassroomModule } from 'src/classroom/classroom.module';
import {
  GradeReview,
  GradeReviewSchema,
} from 'src/grade-reviews/schemas/grade-review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assignment.name, schema: AssignmentSchema },
      { name: StudentAssignment.name, schema: StudentAssignmentSchema },
      { name: GradeReview.name, schema: GradeReviewSchema },
    ]),
    ClassroomModule,
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
  exports: [AssignmentService],
})
export class AssignmentModule {}
