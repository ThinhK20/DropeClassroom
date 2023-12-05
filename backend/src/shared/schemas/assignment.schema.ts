import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AssignmentStatus } from 'src/shared/enums/assignment.enum';
import { AssignmentType } from 'src/shared/enums/assignment.enum';

export type AssignmentDocument = HydratedDocument<Assignment>;

@Schema({
  timestamps: true,
})
export class Assignment {
  @Prop({ required: true })
  assignmentName: string;

  @Prop({ required: true })
  assignmentDescription: string;

  @Prop({ default: Date.now })
  assignmentDueDate: Date;

  @Prop({ default: '' })
  assignmentClassId: string;

  @Prop({ default: '' })
  assignmentType: string;

  @Prop({ default: '' })
  assignmentStatus: string;

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
