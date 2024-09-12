import axios, { AxiosInstance } from 'axios';
export const useAxios = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
  });
  return instance
}

