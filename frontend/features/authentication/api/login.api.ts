import { axiosInstance } from "./axios.instance";
import { LoginPayload, ApiResponse } from "../types/auth.types";

/**
 * API function to login a user.
 * 
 * @param {LoginPayload} payload - The user login credentials.
 * @returns {Promise<ApiResponse>} - The backend response containing JWT tokens and user data.
 */
export const loginUserApi = async (payload: LoginPayload): Promise<ApiResponse> => {
  const response = await axiosInstance.post<ApiResponse>("/auth/login", payload);
  return response.data;
};
