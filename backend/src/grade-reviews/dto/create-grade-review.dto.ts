import { IsNotEmpty } from 'class-validator';

export class CreateGradeReview {
  @IsNotEmpty()
  studentAssignment: string;

  @IsNotEmpty()
  gradeExpectation: number;

  @IsNotEmpty()
  classId: string;

  @IsNotEmpty()
  studentExplanation: string;
}
