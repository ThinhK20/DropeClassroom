import { UpdateUserInfoDto, User } from "../models";
import { axiosInstance } from "./axiosInterceptor";

export const getAllUsersNotInClassApi = async (
   body: { users: User[] },
   controler: AbortSignal
): Promise<User[]> => {
   return (await axiosInstance.post(`u/nic`, body, { signal: controler })).data;
};

export const updateUserApi = async (body: UpdateUserInfoDto, controler: AbortSignal): Promise<User> => {
  return (await axiosInstance.patch('u', body,  { signal: controler })).data;
}
