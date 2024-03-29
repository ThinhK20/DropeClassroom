import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AssignmentStatus } from 'enums/AssignmentStatus.enum';
import mongoose, { HydratedDocument } from 'mongoose';
import { Assignment } from 'src/shared/schemas/assignment.schema';
import { UserClassroom } from 'src/user-classroom/schemas/user-classroom.schema';

export type StudentDocument = HydratedDocument<StudentAssignment>;

@Schema({ collection: 'StudentAssignment', timestamps: true })
export class StudentAssignment {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserClassroom',
  })
  studentId: UserClassroom;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
  })
  assignmentId: Assignment;

  @Prop({ default: 0 })
  grade: number;

  @Prop({ default: AssignmentStatus.Pending, enum: AssignmentStatus })
  status: AssignmentStatus;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const StudentAssignmentSchema =
  SchemaFactory.createForClass(StudentAssignment);
