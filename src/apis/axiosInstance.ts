import { ROUTES } from "@/routes/routes";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken || localStorage.getItem("accessToken");

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // 어드민 페이지 401 발생 시, 로그인 페이지로 이동
        const isAdminRoute = window.location.pathname.startsWith("/admin");

        if (error.response?.status === 401 && isAdminRoute) {
            useAuthStore.getState().clearAuth();
            window.location.href = ROUTES.LOGIN;
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
