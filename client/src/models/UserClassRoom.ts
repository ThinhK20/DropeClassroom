import { Classroom, User } from ".";

export interface ObjectUserClassRoom {
  classId: Classroom;
  role: "teacher" | "student" | "owner";
  studentId?: string;
  userId: User;
  isActiveStudentId?: boolean;
  isActive?: boolean;
}

export interface ObjectUser {
  userId: User;
  role: "teacher" | "student" | "owner";
}

export interface listUserClassrooms {
  count: number;
  teaching_class: ObjectUserClassRoom[];
  erolled_class: ObjectUserClassRoom[];
  owner_class: ObjectUserClassRoom[];
}

export interface UserClassRoom {
  count: number;
  teaching_class: ObjectUserClassRoom[];
  erolled_class: ObjectUserClassRoom[];
  owner_class: ObjectUserClassRoom[];
  classId?: string | Classroom;
  userId?: User;
  role?: string;
  _id?: string;
}

export interface listInviteUser {
  classId: Classroom;
  userId: User;
  role: "student" | "teacher";
  isActive: false
}
