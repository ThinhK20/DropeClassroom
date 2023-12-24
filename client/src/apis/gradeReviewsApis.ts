import { CreateGradeReviewType } from "../models/GradeReview";
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
