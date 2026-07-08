/**
 * @file auth.types.ts
 * @description Types and interfaces for the authentication module.
 */

/**
 * Payload sent to the backend for User Registration.
 */
export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
  role: "USER" | "MANAGER" | "ADMIN";
}

/**
 * Payload sent to the backend for User Login.
 */
export interface LoginPayload {
  email: string;
  password?: string;
}

/**
 * Common backend response format structure.
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errorMessages?: Array<{
    path: string;
    message: string;
  }>;
  errorSources?: Array<{
    path: string;
    message: string;
  }>;
}

/**
 * Structure of a generic error thrown by the backend.
 */
export interface ApiError {
  message: string;
  statusCode: number;
  fieldErrors?: Record<string, string>;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}
