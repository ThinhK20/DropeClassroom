import { AxiosResponse } from "axios";
import { Comment } from "../models/Comment";
import { axiosInstance } from "./axiosInterceptor";

const API_URL = "/comments";

export const getAllCommentsByGradeReviewIdApi = (
   gradeReviewId: string
): Promise<AxiosResponse<Comment[]>> => {
   return axiosInstance.get(`${API_URL}?grade-review=${gradeReviewId}`);
};

export const addCommentApi = (
   comment: Record<keyof Comment, string>
): Promise<AxiosResponse<Comment>> => {
   return axiosInstance.post(`${API_URL}/create`, comment);
};
