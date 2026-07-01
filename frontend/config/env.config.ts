/**
 * Application Configuration
 * Centralized environment variable management.
 */

const BOXING_API_BASE = process.env.NEXT_PUBLIC_BOXING_API_BASE_URL || 'https://boxing-data-api.p.rapidapi.com';

export const config = {
  backend: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1',
    timeout: Number(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT) || 10000,
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Bobjay',
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000',
  },
  boxingApi: {
    key: process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
    host: 'boxing-data-api.p.rapidapi.com',
    v1: `${BOXING_API_BASE}/v1`,
    v2: `${BOXING_API_BASE}/v2`,
  },
};
