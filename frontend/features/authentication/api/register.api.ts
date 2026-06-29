import { axiosInstance } from "./axios.instance";
import { RegisterPayload, ApiResponse } from "../types/auth.types";

/**
 * API function to register a new user.
 * 
 * @param {RegisterPayload} payload - The normalized registration data.
 * @returns {Promise<ApiResponse>} - The backend response containing user data or success message.
 */
export const registerUserApi = async (payload: RegisterPayload): Promise<ApiResponse> => {
  const response = await axiosInstance.post<ApiResponse>("/auth/register", payload);
  return response.data;
};
