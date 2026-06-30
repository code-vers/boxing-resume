import { axiosInstance } from "./axios.instance";
import { ResetPasswordPayload, ApiResponse } from "../types/auth.types";

export const resetPasswordApi = async (payload: ResetPasswordPayload): Promise<ApiResponse> => {
  const response = await axiosInstance.post<ApiResponse>("/auth/reset-password", payload);
  return response.data;
};
