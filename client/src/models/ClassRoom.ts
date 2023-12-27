import { UserResponse } from "./User";

export interface Classroom {
  _id: string;
  className: string;
  section?: string;
  subject?: string;
  room?: string;
  coverImage: string;
  classCode: string;
  owner: UserResponse;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClassroom {
  className: string;
  section?: string;
  subject?: string;
  room?: string;
}

export interface UpdateClassroom {
  className: string;
  section?: string;
  subject?: string;
  room?: string;
}
