import { CreateGradeReviewType, GradeReview } from "../models/GradeReview";
import { axiosInstance } from "./axiosInterceptor";

const API_URL = "/grade-reviews";

export const getAllGradeReviewsApi = async () => {
   return await axiosInstance.get(`${API_URL}`);
};

export const getAllGradeReviewsByClassIdApi = async (id: string) => {
   return await axiosInstance.get(`${API_URL}/class/${id}`);
};

export const createGradeReviewApi = async (
   submitData: CreateGradeReviewType
) => {
   return await axiosInstance.post(`${API_URL}/create`, submitData);
};

export const updateGradeReviewApi = async (submitData: GradeReview) => {
   return await axiosInstance.put(`${API_URL}/update`, submitData);
};

export const deleteGradeReviewApi = async (id: string) => {
   return await axiosInstance.delete(`${API_URL}/${id}`);
};
