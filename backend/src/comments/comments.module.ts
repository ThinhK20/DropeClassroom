import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, CommentType } from './schemas/comments.schema';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import {
  GradeReview,
  GradeReviewSchema,
} from 'src/grade-reviews/schemas/grade-review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentType.name, schema: CommentSchema },
    ]),
    MongooseModule.forFeature([
      { name: GradeReview.name, schema: GradeReviewSchema },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
