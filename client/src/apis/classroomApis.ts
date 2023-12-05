import { CreateClassroom, ObjectUserClassRoom, UserClassRoom } from "../models";
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
): Promise<ObjectUserClassRoom> => {
  const res = (await axiosInstance.post(path, body, { signal: controler })).data;

  return {
    classId: res,
    role: "owner",
  };
};
