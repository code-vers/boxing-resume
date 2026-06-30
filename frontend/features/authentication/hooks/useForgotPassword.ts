import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../api/forgot-password.api";
import { ForgotPasswordPayload } from "../types/auth.types";
import { toast } from "sonner";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPasswordApi(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Reset link sent to your email.");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to send reset link.";
      toast.error(message);
    },
  });
};
