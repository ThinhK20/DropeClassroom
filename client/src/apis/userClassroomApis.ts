import { axiosInstance } from "./axiosInterceptor";

export const getUserClassroomApi = async (id: string) => {
   return await axiosInstance.get(`/uic/get/${id}`);
};

export const getUserClassroomByUserIdAndClassIdApi = async (
   userId: string,
   classId: string
) => {
   return await axiosInstance.get(
      `/uic/specific?userId=${userId}&classId=${classId}`
   );
};
