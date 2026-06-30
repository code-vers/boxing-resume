import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "../api/reset-password.api";
import { ResetPasswordPayload } from "../types/auth.types";
import { toast } from "sonner";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPasswordApi(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successfully. You can now login.");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to reset password.";
      toast.error(message);
    },
  });
};
