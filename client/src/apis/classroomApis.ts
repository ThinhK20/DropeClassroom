import {
  Classroom,
  CreateClassroom,
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
