/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "./axiosInterceptor";

export const getAllStudentAssignments = async () => {
   return await axiosInstance.get("/student-assignments");
};

export const getStudentAssignmentById = async (id: string) => {
   return await axiosInstance.get("/student-assignments/assignment/" + id);
};

export const getAllStudentAssignmentsByClassId = async (
   isCalculated: boolean = false,
   id: string,
   isGroup: boolean = false
) => {
   return await axiosInstance.get(
      `/student-assignments/class?id=${id}&group=${isGroup}&calculated=${isCalculated}`
   );
};

export const createStudentAssignment = async (submitData: {
   studentId: string;
   assignmentId: string;
}) => {
   return await axiosInstance.post("/student-assignments/create", submitData);
};

export const updateStudentAssignmentApi = async (id: any, submitData: any) => {
   return await axiosInstance.put(
      "/student-assignments/update/" + id,
      submitData
   );
};

export const updateStudentAssignmentByStudentAndAssignmentIdApi = async (
   submitData: any
) => {
   return await axiosInstance.put(
      "/student-assignments/updateByBody",
      submitData
   );
};
