import axios, {AxiosInstance} from 'axios';

const baseURL = 'https://14.design.pages.academy/six-cities';
const timeout = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: baseURL,
    timeout: timeout,
  });

  return api;
};

