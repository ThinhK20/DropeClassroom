import {
   Classroom,
   CreateClassroom,
   ObjectUser,
   ObjectUserClassRoom,
   UpdateClassroom,
   listInviteUser,
   listUserClassrooms,
} from "../models";
import { axiosInstance } from "./axiosInterceptor";

export const getAllClassesApi = async (
   path: string,
   controler: AbortSignal
): Promise<listUserClassrooms> => {
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
): Promise<ObjectUserClassRoom[]> => {
   return (await axiosInstance.get(`c/${id}/uic`, { signal: controler })).data;
};

export const addUserToClassApi = async (
   id: string,
   body: ObjectUser,
   controler: AbortSignal
) => {
   return await axiosInstance.post(`c/${id}/uic`, body, { signal: controler });
};

export const deleteUserClassApi = async (
   id: string,
   body: { user: string },
   controler: AbortSignal
) => {
   return await axiosInstance.post(`c/${id}/rm-uic`, body, {
      signal: controler,
   });
};

export const userJoinClassByCodeApi = async (
   body: { classCode: string },
   controler: AbortSignal
) => {
   return await axiosInstance.post(`c/uic`, body, { signal: controler });
};

export const getClassByIdApi = async (id: string) => {
   return await axiosInstance.get(`c/${id}`);
};

export const joinClassByLink_v1Api = async (
   path: string,
   controler: AbortSignal
) => {
   return await axiosInstance.get(path, { signal: controler });
};

export const acceptByLinkApi = async (path: string, controler: AbortSignal) => {
   return await axiosInstance.post(path, { signal: controler });
};

export const inviteUsersApi = async (
   id: string,
   body: listInviteUser[],
   controler: AbortSignal
) => {
   return await axiosInstance.post(`/c/${id}/invite`, body, {
      signal: controler,
   });
};

export const getClassByAdminApi = async (controler: AbortSignal) => {
   return await axiosInstance.get("c/ad/all", { signal: controler });
};

export const activeClassByAdminApi = async (
   body: {
      _id: string;
      isActive: boolean;
   },
   controler: AbortSignal
) => {
   return await axiosInstance.patch("c/ad/active", body, { signal: controler });
};

export const deleteClass = async (id: string, controler: AbortSignal) => {
   return await axiosInstance.delete(`c/${id}`, { signal: controler });
};
