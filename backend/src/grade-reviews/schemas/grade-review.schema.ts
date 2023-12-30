/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AssignmentStatus } from 'enums/AssignmentStatus.enum';
import { NextFunction } from 'express';
import mongoose, { HydratedDocument, Model, model } from 'mongoose';
import { Classroom } from 'src/classroom/schemas/classroom.schema';
import { CommentType } from 'src/comments/schemas/comments.schema';
import { StudentAssignment } from 'src/student-assignment/schemas/student-assignment.schema';

export type GradeReviewDocument = HydratedDocument<GradeReview>;

@Schema({ collection: 'GradeReview', timestamps: true })
export class GradeReview {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
  })
  classId: Classroom;

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

  @Prop({
    enum: AssignmentStatus,
    default: AssignmentStatus.Pending,
  })
  status: AssignmentStatus;
}

export const GradeReviewSchema = SchemaFactory.createForClass(GradeReview);

export const GradeReviewFactory = (comment_model: Model<CommentType>) => {
  const schema = GradeReviewSchema;
  schema.pre('findOneAndDelete', async function (next) {
    console.log('CAlled: ');
    // const doc = await this.model.findOne(this.getFilter());
    return next();
  });

  return schema;
};
