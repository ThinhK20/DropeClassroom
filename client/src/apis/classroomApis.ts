
import { axiosInstance } from "./axiosInterceptor";

export const getAllClassesApi = async (path: string, controler: AbortSignal) => {
  return (await axiosInstance.get(path, {signal: controler})).data;
};
