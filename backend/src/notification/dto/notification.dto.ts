import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { Assignment } from 'src/shared/schemas/assignment.schema';
import { User } from 'src/shared/schemas/user.schema';
import { Classroom } from 'src/classroom/schemas/classroom.schema';

export class NotificationDto {
  readonly _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  readonly studentId: User;

  @IsNotEmpty()
  readonly assignmentId: Assignment;

  @IsNotEmpty()
  readonly classId: Classroom;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
