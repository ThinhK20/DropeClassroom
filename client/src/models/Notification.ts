export interface Notification {
  _id: string;
  studentId?: string;
  assignmentId?: string;
  classId?: string;
  title: string;
  content: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}
