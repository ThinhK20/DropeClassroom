import { UserClassRoom } from ".";
import { GradeReview } from "./GradeReview";

export interface Comment {
   _id?: string;
   gradeReview: GradeReview;
   userClassroom: UserClassRoom;
   content: string;
   createdAt?: string;
   updatedAt?: string;
}

export type CreateComment = {
   [c in keyof Comment]: string;
};
