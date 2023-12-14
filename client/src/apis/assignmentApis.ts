import { axiosInstance } from "./axiosInterceptor";

export const getAssignmentsApi = async () => {
   return await axiosInstance.get("/assignment");
};

export const getAssignmentsByClassId = async (id: string) => {
   return await axiosInstance.get("/assignment/class/" + id);
};
