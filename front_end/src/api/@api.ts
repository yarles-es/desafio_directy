import type { AxiosResponse } from "axios";
import axios from "axios";

const urlLink = "http://localhost:3000/api";

export const api = () => {
  const apiInstance = axios.create({
    baseURL: urlLink,
  });
  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response) {
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  return apiInstance;
};

export default api;
