import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { GradeReviewsService } from './grade-reviews.service';
import { GradeReviewsController } from './grade-reviews.controller';
import { GradeReview, GradeReviewFactory } from './schemas/grade-review.schema';
import {
  StudentAssignment,
  StudentAssignmentSchema,
} from 'src/student-assignment/schemas/student-assignment.schema';
import {
  CommentSchema,
  CommentType,
} from 'src/comments/schemas/comments.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: GradeReview.name,
        inject: [getModelToken(CommentType.name)],
        imports: [
          MongooseModule.forFeature([
            { name: CommentType.name, schema: CommentSchema },
          ]),
        ],
        useFactory: GradeReviewFactory,
      },
    ]),
    MongooseModule.forFeature([
      { name: StudentAssignment.name, schema: StudentAssignmentSchema },
    ]),
  ],
  controllers: [GradeReviewsController],
  providers: [GradeReviewsService],
  exports: [GradeReviewsService],
})
export class GradeReviewsModule {}
