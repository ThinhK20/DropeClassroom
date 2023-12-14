import { IsOptional, IsString } from 'class-validator';

export class UpdateAssignmentDto {
  @IsOptional()
  @IsString()
  readonly assignmentName: string;

  @IsOptional()
  @IsString()
  readonly assignmentDescription: string;

  @IsOptional()
  @IsString()
  readonly assignmentDueDate: string;

  @IsOptional()
  @IsString()
  readonly assignmentGrade: string;

  @IsOptional()
  @IsString()
  readonly assignmentGradeComment: string;
}
