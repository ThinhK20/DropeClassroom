
import { axiosInstance } from "./axiosInterceptor";

export const getAllClassesApi = async () => {
  return (await axiosInstance.get("/c/all"));
};
