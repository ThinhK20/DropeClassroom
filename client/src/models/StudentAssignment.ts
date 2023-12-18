import { User } from ".";
import { AssignmentStatusEnum } from "../shared/enums/StudentAssignment";
export interface StudentAssignment {
   _id: string;
   studentId: User;
   assignmentId: string;
   grade: number;
   status: AssignmentStatusEnum;
   isActive: boolean;
}

export interface UpdateStudentAssignment {
   assignmentId: string;
   studentId: string;
   grade: string;
}
