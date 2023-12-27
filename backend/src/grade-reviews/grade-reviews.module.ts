import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeReviewsService } from './grade-reviews.service';
import { GradeReviewsController } from './grade-reviews.controller';
import { GradeReview, GradeReviewSchema } from './schemas/grade-review.schema';
import {
  StudentAssignment,
  StudentAssignmentSchema,
} from 'src/student-assignment/schemas/student-assignment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GradeReview.name, schema: GradeReviewSchema },
      { name: StudentAssignment.name, schema: StudentAssignmentSchema },
    ]),
  ],
  controllers: [GradeReviewsController],
  providers: [GradeReviewsService],
  exports: [GradeReviewsService],
})
export class GradeReviewsModule {}
