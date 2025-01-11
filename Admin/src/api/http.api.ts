import axios, { AxiosRequestHeaders } from 'axios';
import { AxiosError } from 'axios';
import { ApiError } from '@app/api/ApiError';
import { readToken } from '@app/services/localStorage.service';

export const httpApi = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: '',
});

httpApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `${readToken()}`,
    AccessControlAllowOrigin: '*',
  } as unknown as AxiosRequestHeaders;
  return config;
});

httpApi.interceptors.response.use(undefined, (error: AxiosError<unknown>) => {
  const responseData: unknown = error.response?.data;
  const errorMessage: string =
    typeof responseData === 'object' && responseData !== null && 'message' in responseData
      ? (responseData.message as string)
      : error.message;

  const apiErrorData: ApiErrorData | undefined =
    typeof responseData === 'object' && responseData !== null && 'apiErrorData' in responseData
      ? (responseData.apiErrorData as ApiErrorData)
      : undefined;

  throw new ApiError<ApiErrorData>(errorMessage, apiErrorData);
});

export interface ApiErrorData {
  message: string;
}
