import { axiosInstance } from "./axiosInterceptor";

export const getUserClassroom = async (id: string) => {
   return await axiosInstance.get(`/uic/${id}`);
};
