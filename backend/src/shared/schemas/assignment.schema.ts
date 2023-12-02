import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AssignmentStatus } from 'src/shared/enums/assignment.enum';
import { AssignmentType } from 'src/shared/enums/assignment.enum';

export type AssignmentDocument = HydratedDocument<Assignment>;

@Schema({
  timestamps: true,
})
export class Assignment {
  @Prop({ required: true })
  assignmentId: string;

  @Prop({ required: true })
  assignmentName: string;

  @Prop({ required: true })
  assignmentDescription: string;

  @Prop({ required: true })
  assignmentDueDate: Date;

  @Prop({ required: true })
  assignmentDueTime: string;

  @Prop({ required: true })
  assignmentClassId: string;

  @Prop({ required: true })
  assignmentType: string;

  @Prop({ required: true })
  assignmentStatus: string;

  @Prop({ required: true })
  assignmentTeacherId: string;

  @Prop({ required: true })
  assignmentStudentId: string;

  @Prop({ required: true })
  assignmentGrade: string;

  @Prop({ required: true })
  assignmentGradeComment: string;

  @Prop({ required: true })
  assignmentCreatedDate: Date;

  @Prop({ required: true })
  assignmentUpdatedDate: Date;

  @Prop({ required: true })
  assignmentCreatedBy: string;

  @Prop({ required: true })
  assignmentUpdatedBy: string;

  @Prop({ required: true })
  assignmentPercentage: number;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
