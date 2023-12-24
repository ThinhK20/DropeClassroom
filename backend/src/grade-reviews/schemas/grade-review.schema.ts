import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { StudentAssignment } from 'src/student-assignment/schemas/student-assignment.schema';

export type GradeReviewDocument = HydratedDocument<GradeReview>;

@Schema({ collection: 'GradeReview', timestamps: true })
export class GradeReview {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentAssignment',
  })
  studentAssignment: StudentAssignment;

  @Prop({ default: 0 })
  gradeExpectation: number;

  @Prop({ default: '' })
  studentExplanation: string;
}

export const GradeReviewSchema = SchemaFactory.createForClass(GradeReview);
