import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { GradeReview } from 'src/grade-reviews/schemas/grade-review.schema';
import { UserClassroom } from 'src/user-classroom/schemas/user-classroom.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ collection: 'Comment', timestamps: true })
export class CommentType {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GradeReview',
  })
  gradeReview: GradeReview;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserClassroom',
  })
  userClassroom: UserClassroom;

  @Prop({ default: '' })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentType);
