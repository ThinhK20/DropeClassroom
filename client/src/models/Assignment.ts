export interface Assignment {
  _id: string;
  assignmentName: string;
  assignmentDescription: string;
  assignmentDueDate: string;
  assignmentStatus: string;
  assignmentCreatedBy: string;
  assignmentUpdatedBy: string;
  assignmentClassId: string;
  assignmentGrade: number;
  assignmentGradeComment: string;
  assignmentPercentage: number;
}

export interface CreateAssignment {
  assignmentName: string;
  assignmentDescription: string;
  assignmentDueDate: string;
  assignmentStatus: string;
  assignmentClassId: string;
  assignmentGrade: number;
  assignmentPercentage: number;
}

export interface UpdateAssignment {
  assignmentName: string;
  assignmentDescription: string;
  assignmentDueDate: string;
  assignmentStatus: string;
  assignmentUpdatedBy: string;
  assignmentClassId: string;
  assignmentGrade: number;
  assignmentGradeComment: string;
  assignmentPercentage: number;
}
