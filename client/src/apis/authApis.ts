import { SignUpUser } from "../models/User";
import { axiosInstance } from "./axiosInterceptor";

export const loginApi = async (loginUser: {
   email: string;
   password: string;
}) => {
   return await axiosInstance.post("/auth/login", loginUser);
};

export const signupApi = async (signupUser: SignUpUser) => {
   return await axiosInstance.post("/auth/signup", signupUser);
};
