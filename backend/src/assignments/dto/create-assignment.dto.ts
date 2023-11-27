import { AssignmentType, AssignmentStatus } from 'src/enums/assignment.enum';
export class CreateAssignmentDto {
  readonly assignmentId: string;
  readonly assignmentName: string;
  readonly assignmentDescription: string;

  readonly assignmentDueDate: Date;
  readonly assignmentDueTime: string;

  readonly assignmentClassId: string;
  readonly assignmentClassName: string;

  readonly assignmentType: string;
  readonly assignmentStatus: string;

  readonly assignmentTeacherId: string;
  readonly assignmentTeacherName: string;

  readonly assignmentStudentId: string;
  readonly assignmentStudentName: string;

  readonly assignmentGrade: string;
  readonly assignmentGradeComment: string;

  readonly assignmentCreatedDate: Date;
  readonly assignmentUpdatedDate: Date;

  readonly assignmentCreatedBy: string;
  readonly assignmentUpdatedBy: string;

  readonly assignmentPercentage: number;
}
