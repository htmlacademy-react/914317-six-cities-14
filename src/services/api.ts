import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import { getToken } from './token';

const baseURL = 'https://14.design.pages.academy/six-cities';
const timeout = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: baseURL,
    timeout: timeout,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }

      return config;
    },
  );

  return api;
};

