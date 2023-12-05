import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isString,
} from 'class-validator';
import mongoose from 'mongoose';
import {
  AssignmentType,
  AssignmentStatus,
} from 'src/shared/enums/assignment.enum';
export class CreateAssignmentDto {
  readonly _id: mongoose.Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @IsString()
  readonly assignmentName: string;

  @IsString()
  @IsNotEmpty()
  @IsString()
  readonly assignmentDescription: string;

  @IsOptional()
  @IsDate()
  readonly assignmentDueDate: Date;

  @IsOptional()
  @IsString()
  readonly assignmentClassId: string;

  @IsOptional()
  @IsString()
  readonly assignmentType: string;

  @IsOptional()
  @IsString()
  readonly assignmentStatus: string;

  @IsOptional()
  @IsNumber()
  readonly assignmentGrade: number;

  @IsOptional()
  @IsString()
  readonly assignmentGradeComment: string;

  @IsOptional()
  @IsString()
  readonly assignmentCreatedBy: string;

  @IsOptional()
  @IsString()
  readonly assignmentUpdatedBy: string;

  @IsOptional()
  @IsNumber()
  readonly assignmentPercentage: number;
}
