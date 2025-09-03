import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./constants";

export const appAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10 * 60 * 1000,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});

appAxios.interceptors.request.use(
  async (config) => {
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (err: AxiosError<any>) => Promise.reject(err),
);

appAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err: AxiosError<any>) => Promise.reject(err),
);

const apiService = {
  get: <TResponse>(url: string, config?: AxiosRequestConfig<any>) =>
    appAxios.get<TResponse>(url, config).then((res) => res.data),
  post: <TResponse>(url: string, data: any, config?: AxiosRequestConfig<any>) =>
    appAxios.post<TResponse>(url, data, config).then((res) => res.data),
  put: <TResponse>(url: string, data: any, config?: AxiosRequestConfig<any>) =>
    appAxios.put<TResponse>(url, data, config).then((res) => res.data),
  delete: <TResponse>(url: string, config?: AxiosRequestConfig<any>) =>
    appAxios.delete<TResponse>(url, config).then((res) => res.data),
};      

export default apiService;