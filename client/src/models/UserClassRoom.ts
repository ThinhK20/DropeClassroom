import { Classroom, User } from ".";

export interface ObjectUserClassRoom {
   classId: Classroom;
   role: "teacher" | "student" | "owner";
}

export interface ObjectUser {
   userId: User;
   role: "teacher" | "student" | "owner";
}

export interface UserClassRoom {
   count: number;
   teaching_class: ObjectUserClassRoom[];
   erolled_class: ObjectUserClassRoom[];
   owner_class: ObjectUserClassRoom[];
   classId?: string | Classroom;
   userId?: User;
   role?: string;
}
