import {
  Classroom,
  CreateClassroom,
  ObjectUser,
  UpdateClassroom,
  UserClassRoom,
} from "../models";
import { axiosInstance } from "./axiosInterceptor";

export const getAllClassesApi = async (
  path: string,
  controler: AbortSignal
): Promise<UserClassRoom> => {
  return (await axiosInstance.get(path, { signal: controler })).data;
};

export const createClassApi = async (
  path: string,
  body: CreateClassroom,
  controler: AbortSignal
): Promise<Classroom> => {
  const res = (await axiosInstance.post(path, body, { signal: controler }))
    .data;

  return res;
};

export const updateClassApi = async (
  path: string,
  body: UpdateClassroom,
  controler: AbortSignal
) => {
  const res = await axiosInstance.patch(path, body, { signal: controler });

  return res;
};

export const getAllUsersClassApi = async (
  id: string,
  controler: AbortSignal
): Promise<ObjectUser[]> => {
  return (await axiosInstance.get(`c/${id}/uic`, { signal: controler })).data;
};

export const addUserToClassApi = async (id: string, body: ObjectUser, controler: AbortSignal) => {
  return await axiosInstance.post(`c/${id}/uic`, body, {signal: controler})
}

export const deleteUserClassApi = async (id: string, body: {user: string}, controler: AbortSignal) => {
  return await axiosInstance.post(`c/${id}/rm-uic`, body, {signal: controler})
} 

export const userJoinClassByCodeApi = async (body: {classCode: string}, controler: AbortSignal) => {
  return await axiosInstance.post(`c/uic`, body, {signal: controler});
} 