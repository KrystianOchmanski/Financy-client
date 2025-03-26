import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = (await cookies()).get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.get("auth/refreshToken");
        (await cookies()).set("accessToken", data.accessToken, {
          secure: true,
          sameSite: "strict",
        });
        onRefreshed(data.accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        (await cookies()).delete("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
