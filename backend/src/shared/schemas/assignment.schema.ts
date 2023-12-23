import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AssignmentStatus } from 'enums/AssignmentStatus.enum';
export type AssignmentDocument = HydratedDocument<Assignment>;

@Schema({
  timestamps: true,
})
export class Assignment {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  assignmentName: string;

  @Prop({ required: true })
  assignmentDescription: string;

  @Prop({ default: '' })
  assignmentDueDate: string;

  @Prop({ default: '' })
  assignmentClassId: string;

  @Prop({ default: '' })
  assignmentType: string;

  @Prop({ default: AssignmentStatus.Pending, enum: AssignmentStatus })
  assignmentStatus: AssignmentStatus;

  @Prop({ default: 0 })
  assignmentGrade: number;

  @Prop({ default: '' })
  assignmentGradeComment: string;

  @Prop({ default: '' })
  assignmentCreatedBy: string;

  @Prop({ default: '' })
  assignmentUpdatedBy: string;

  @Prop({ default: 0 })
  assignmentPercentage: number;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
