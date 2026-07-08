import { useMutation } from "@tanstack/react-query";
import { loginUserApi } from "../api/login.api";
import { LoginPayload, ApiResponse, ApiError } from "../types/auth.types";
import { parseApiError } from "../utils/error-parser.util";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider"; // Using existing provider to maintain state

/**
 * Custom hook to handle user login via TanStack Query.
 * Includes built-in error parsing, JWT extraction (future), and success routing.
 */
export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuth(); // Global state setter from existing architecture

  return useMutation<ApiResponse, ApiError, LoginPayload>({
    mutationFn: async (payload) => {
      try {
        return await loginUserApi(payload);
      } catch (error) {
        throw parseApiError(error);
      }
    },
    onSuccess: (data) => {
      if (data.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
      }
      
      toast.success("Login successful!");
      
      if (data.data?.user) {
        const user = data.data.user;
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
        login({
          ...user,
          avatar: user.image ? `${serverUrl}${user.image}` : undefined
        });
      }
      
      // Redirect based on role
      const role = data.data?.user?.role;
      if (role === "ADMIN") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    },
    retry: 0,
  });
};
