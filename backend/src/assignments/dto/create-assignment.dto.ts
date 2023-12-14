import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

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
  @IsString()
  readonly assignmentDueDate: string;

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
