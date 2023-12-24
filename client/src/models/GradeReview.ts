import { StudentAssignment } from "./StudentAssignment";

export interface GradeReview {
   _id: string;
   classId: string;
   studentAssignment: StudentAssignment;
   gradeExpectation: number;
   studentExplanation: string;
}

export interface CreateGradeReviewType {
   gradeExpectation: number;
   studentExplanation: string;
   classId: string;
   studentAssignment: string;
}
