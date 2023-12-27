import { axiosInstance } from "./axiosInterceptor";

export const getUserClassroomApi = async (id: string) => {
   return await axiosInstance.get(`/uic/${id}`);
};
