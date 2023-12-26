import { Assignment, UserClassRoom } from ".";
import { AssignmentStatusEnum } from "../shared/enums/StudentAssignment";
export interface StudentAssignment {
   _id: string;
   studentId: UserClassRoom;
   assignmentId: Assignment;
   grade: number;
   status: AssignmentStatusEnum;
   isActive: boolean;
}

export interface UpdateStudentAssignment {
   assignmentId: string;
   studentId: string;
   grade: string;
}

export interface GroupStudentAssignmentsByStudentId {
   studentId: string;
   assignments: StudentAssignment[];
}

export interface GroupStudentAssignmentsByAssignmentId {
   [key: string]: StudentAssignment[];
}
