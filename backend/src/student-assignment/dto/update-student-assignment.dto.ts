import { IsEnum, IsOptional } from 'class-validator';
import { AssignmentStatus } from 'enums/AssignmentStatus.enum';

export class UpdateStudentAssignmentDto {
  @IsOptional()
  readonly studentId: string;

  @IsOptional()
  readonly assignmentId: string;

  @IsOptional()
  readonly grade: number;

  @IsEnum(AssignmentStatus)
  @IsOptional()
  readonly status: AssignmentStatus;

  @IsOptional()
  readonly isActive: boolean;
}
