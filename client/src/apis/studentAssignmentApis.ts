import { axiosInstance } from "./axiosInterceptor";

export const getAllStudentAssignments = async () => {
   return await axiosInstance.get("/student-assignments");
};

export const getStudentAssignmentById = async (id: string) => {
   return await axiosInstance.get("/student-assignments/" + id);
};

export const createStudentAssignment = async (submitData: {
   studentId: string;
   assignmentId: string;
}) => {
   return await axiosInstance.post("/student-assignments/create", submitData);
};
