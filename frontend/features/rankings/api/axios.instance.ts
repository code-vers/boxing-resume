import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';
import { config } from '../../../config/env.config';

/**
 * Axios Instance for Boxing Data API (RapidAPI)
 */
export const boxingApiInstance = axios.create({
  baseURL: config.boxingApi.v2,
  timeout: config.backend.timeout,
  headers: {
    'x-rapidapi-host': config.boxingApi.host,
    'x-rapidapi-key': config.boxingApi.key,
  },
});

// We can add interceptors here if needed in the future
boxingApiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
