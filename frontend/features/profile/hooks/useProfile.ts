import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileApi, updateProfileApi, uploadProfileImageApi, changePasswordApi } from "../api/profile.api";
import { UpdateProfilePayload, ChangePasswordPayload } from "../types/profile.types";
import { toast } from "sonner";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfileApi(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to update profile.";
      toast.error(message);
    },
  });
};

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (file: File) => uploadProfileImageApi(file),
    onSuccess: (data) => {
      toast.success(data.message || "Profile image updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to upload image.";
      toast.error(message);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePasswordApi(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Password changed successfully.");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to change password.";
      toast.error(message);
    },
  });
};
