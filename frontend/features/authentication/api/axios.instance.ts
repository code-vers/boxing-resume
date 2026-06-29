import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

/**
 * Enterprise Axios Instance.
 * Pre-configured with base URL, timeouts, and interceptors for future JWT scaling.
 */
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
  timeout: Number(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 * Automatically injects the Authorization header if an access token exists.
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // In future JWT integration:
    // const token = localStorage.getItem('accessToken');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles 401 Unauthorized responses to trigger token refresh or logout.
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    // const originalRequest = error.config;
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //    Trigger refresh token flow here in the future
    // }
    return Promise.reject(error);
  }
);
