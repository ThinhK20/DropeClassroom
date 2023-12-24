import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeReviewsService } from './grade-reviews.service';
import { GradeReviewsController } from './grade-reviews.controller';
import { GradeReview, GradeReviewSchema } from './schemas/grade-review.schema';
import { StudentAssignmentModule } from 'src/student-assignment/student-assignment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GradeReview.name, schema: GradeReviewSchema },
    ]),
    StudentAssignmentModule,
  ],
  controllers: [GradeReviewsController],
  providers: [GradeReviewsService],
  exports: [GradeReviewsService],
})
export class GradeReviewsModule {}
