import { axiosInstance } from "./axiosInterceptor";
import { AxiosResponse } from "axios";
import { Assignment, CreateAssignment, UpdateAssignment } from "../models";

export const getAssignmentsApi = async () => {
   return await axiosInstance.get("/assignment");
};

export const getAssignmentsByClassId = async (id: string) => {
   return await axiosInstance.get("/assignment/class/" + id);
};

export const getAllAssignmentsApi = async (
   path: string,
   controler: AbortSignal
): Promise<Assignment[]> => {
   return (await axiosInstance.get(path, { signal: controler })).data;
};

export const createAssignmentApi = async (
   path: string,
   body: CreateAssignment,
   controler: AbortSignal
): Promise<Assignment> => {
   const res = (await axiosInstance.post(path, body, { signal: controler }))
      .data;

   return res;
};

export const updateAssignmentApi = async (
   path: string,
   body: UpdateAssignment,
   controler: AbortSignal
): Promise<AxiosResponse<Assignment>> => {
   const res = await axiosInstance.patch(path, body, { signal: controler });

   return res;
};

export const deleteAssignmentApi = async (
   path: string,
   controler: AbortSignal
): Promise<AxiosResponse<Assignment>> => {
   const res = await axiosInstance.delete(path, { signal: controler });

   return res;
};

// BEGIN: assignmentApis.ts

// Your code here

// END: assignmentApis.ts
