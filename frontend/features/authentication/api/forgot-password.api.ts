import { axiosInstance } from "./axios.instance";
import { ForgotPasswordPayload, ApiResponse } from "../types/auth.types";

export const forgotPasswordApi = async (payload: ForgotPasswordPayload): Promise<ApiResponse> => {
  const response = await axiosInstance.post<ApiResponse>("/auth/forgot-password", payload);
  return response.data;
};
