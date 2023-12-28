import { User } from "./User";

export interface Classroom {
  _id: string;
  className: string;
  section?: string;
  subject?: string;
  room?: string;
  coverImage: string;
  classCode: string;
  owner: User;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  inviteLink: string;
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
