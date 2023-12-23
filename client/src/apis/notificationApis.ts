import { axiosInstance } from "./axiosInterceptor";

export const getAllNotifications = async () => {
  return await axiosInstance.get("/notifications");
};

export const createNotification = async (submitData: {
  studentId: string;
  assignmentId: string;
  title: string;
  content: string;
}) => {
  return await axiosInstance.post("/notifications/create", submitData);
};
