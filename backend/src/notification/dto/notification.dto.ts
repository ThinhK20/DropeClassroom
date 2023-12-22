import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { Assignment } from 'src/shared/schemas/assignment.schema';
import { User } from 'src/shared/schemas/user.schema';

export class NotificationDto {
  readonly _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly studentId: User;

  @IsNotEmpty()
  @IsString()
  readonly assignmentId: Assignment;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;
}
