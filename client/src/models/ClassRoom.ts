export interface Classroom {
    _id: string;
    className: string;
    section?: string;
    subject?: string;
    room?: string;
    coverImage: string;
    classCode: string;
    owner: string;
}