import { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiError, ApiResponse } from "../types/auth.types";

/**
 * Parses an Axios error from the backend into a standardized ApiError format.
 * If field errors exist (e.g. from validation), they are extracted.
 * For generic server errors, a toast notification is displayed.
 *
 * @param error - The raw error caught in the try/catch or react-query onError block
 * @returns {ApiError} - Standardized error object
 */
export const parseApiError = (error: unknown): ApiError => {
  const defaultError: ApiError = {
    message: "An unexpected error occurred. Please try again.",
    statusCode: 500,
  };

  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError<ApiResponse>;
    const responseData = axiosError.response?.data;
    const status = axiosError.response?.status || 500;

    const parsedError: ApiError = {
      message: responseData?.message || axiosError.message || defaultError.message,
      statusCode: status,
    };

    // If there are specific field validation errors from backend
    if (responseData?.errorMessages && Array.isArray(responseData.errorMessages)) {
      parsedError.fieldErrors = {};
      responseData.errorMessages.forEach((err) => {
        // Use the last segment of the path as the field name if it's an array path
        const fieldName = err.path || "general";
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        parsedError.fieldErrors![fieldName] = err.message;
      });
    }

    // Display a global toast for non-validation errors (500, 401, 403)
    if (status >= 500 || status === 401 || status === 403) {
      toast.error(parsedError.message);
    }

    return parsedError;
  }

  // Network or unknown errors
  toast.error(defaultError.message);
  return defaultError;
};
