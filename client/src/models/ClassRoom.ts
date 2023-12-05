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
}

export interface CreateClassroom {
    className: string;
    section?: string;
    subject?: string;
    room?: string;
}