import { axiosInstance } from "../../authentication/api/axios.instance";
import { UpdateProfilePayload, ChangePasswordPayload, ApiResponse, ProfileResponse } from "../types/profile.types";

export const getProfileApi = async (): Promise<ApiResponse<ProfileResponse>> => {
  const response = await axiosInstance.get<ApiResponse<ProfileResponse>>("/users/me");
  return response.data;
};

export const updateProfileApi = async (payload: UpdateProfilePayload): Promise<ApiResponse<ProfileResponse>> => {
  const response = await axiosInstance.patch<ApiResponse<ProfileResponse>>("/users/me", payload);
  return response.data;
};

export const changePasswordApi = async (payload: ChangePasswordPayload): Promise<ApiResponse> => {
  const response = await axiosInstance.post<ApiResponse>("/auth/change-password", payload);
  return response.data;
};

export const uploadProfileImageApi = async (file: File): Promise<ApiResponse<ProfileResponse>> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstance.post<ApiResponse<ProfileResponse>>("/users/me/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return response.data;
};
