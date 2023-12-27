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

export const sendForgotPasswordEmailApi = async (email: string) => {
   return await axiosInstance.post("/auth/forgot-password", { email });
};

export const renewPasswordApi = async (submitForm: {
   token: string;
   id: string;
   password: string;
}) => {
   return await axiosInstance.get(
      `/auth/reset-password?token=${submitForm.token}&id=${submitForm.id}&password=${submitForm.password}`
   );
};

export const loginByGoogleApi = () => {
   return import.meta.env.VITE_API_URL + "/auth/google";
};
