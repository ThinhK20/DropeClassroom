import { ObjectUser, User } from "../models";
import { axiosInstance } from "./axiosInterceptor";

export const getAllUsersNotInClassApi = async (
   body: { users: ObjectUser[] },
   controler: AbortSignal
): Promise<User[]> => {
   return (await axiosInstance.post(`u/nic`, body, { signal: controler })).data;
};
