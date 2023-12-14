import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { AssignmentStatus } from 'enums/AssignmentStatus.enum';
import mongoose from 'mongoose';
import { Assignment } from 'src/shared/schemas/assignment.schema';
import { User } from 'src/shared/schemas/user.schema';

export class StudentAssignmentDto {
  readonly _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  readonly studentId: User;

  @IsNotEmpty()
  readonly assignmentId: Assignment;

  @IsOptional()
  readonly grade: number;

  @IsEnum(AssignmentStatus)
  @IsOptional()
  readonly status: AssignmentStatus;

  @IsOptional()
  readonly isActive: boolean;
}
