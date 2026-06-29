import { useMutation } from "@tanstack/react-query";
import { registerUserApi } from "../api/register.api";
import { RegisterPayload, ApiResponse, ApiError } from "../types/auth.types";
import { parseApiError } from "../utils/error-parser.util";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
 * Custom hook to handle user registration via TanStack Query.
 * Includes built-in error parsing and success routing.
 */
export const useRegister = () => {
  const router = useRouter();

  return useMutation<ApiResponse, ApiError, RegisterPayload>({
    mutationFn: registerUserApi,
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful! Please login.");
      router.push("/login");
    },
    onError: (error: unknown) => {
      // The parseApiError utility transforms the raw error into our ApiError format.
      // We throw it so the component can catch the fieldErrors and bind them to the form.
      throw parseApiError(error);
    },
    retry: 0, // Never retry auth mutations
  });
};
