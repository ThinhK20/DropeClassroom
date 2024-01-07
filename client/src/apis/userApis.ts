import { UpdateUserInfoDto, User } from "../models";
import { axiosInstance } from "./axiosInterceptor";

export const getAllUsersNotInClassApi = async (
  body: { users: User[] },
  controler: AbortSignal
): Promise<User[]> => {
  return (await axiosInstance.post(`u/nic`, body, { signal: controler })).data;
};

export const updateUserApi = async (
  body: UpdateUserInfoDto,
  controler: AbortSignal
): Promise<User> => {
  return (await axiosInstance.patch("u", body, { signal: controler })).data;
};

export const getAllUserApi = async (controler: AbortSignal) => {
  return await axiosInstance.get("u/all", { signal: controler });
};

export const banUserApi = async (id: string, controler: AbortSignal) => {
  return await axiosInstance.patch(
    "/u/b",
    { userId: id },
    { signal: controler }
  );
};

export const unBanUserApi = async (id: string, controler: AbortSignal) => {
  return await axiosInstance.patch(
    "/u/nb",
    { userId: id },
    { signal: controler }
  );
};

export const findUserApi = async (id: string, controler: AbortSignal) => {
  return await axiosInstance.get(`/u/${id}`, { signal: controler });
};

export const updateUserByAdminApi = async (
  id: string,
  body: UpdateUserInfoDto,
  controler: AbortSignal
): Promise<User> => {
  return (await axiosInstance.patch(`/ad/u/${id}`, body, { signal: controler })).data;
};
