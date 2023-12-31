import { StudentAssignment } from "./StudentAssignment";

export interface GradeReview {
   _id: string;
   classId: string;
   studentAssignment: StudentAssignment;
   gradeExpectation: number;
   studentExplanation: string;
   status?: string;
   createdAt?: string;
   updatedAt?: string;
}

export interface CreateGradeReviewType {
   gradeExpectation: number;
   studentExplanation: string;
   classId: string;
   studentAssignment: string;
   status?: string;
}
