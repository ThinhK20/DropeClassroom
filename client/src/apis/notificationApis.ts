import { axiosInstance } from "./axiosInterceptor";

export const getAllNotifications = async () => {
  return await axiosInstance.get("/notifications");
};

export const createNotification = async (submitData: {
  studentId: string;
  assignmentId?: string;
  classId: string;
  title: string;
  content: string;
  link: string;
}) => {
  return await axiosInstance
    .post("/notifications/create", submitData)
    .then((res) => res.data)
    .then(() => window.location.reload());
};
