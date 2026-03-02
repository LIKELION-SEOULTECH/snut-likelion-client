import axios from "axios";
import { ROUTES } from "@/routes/routes";
import { useAuthStore } from "@/stores/useAuthStore";

interface FailedQueueItem {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}

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

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    useAuthStore.getState().clearAuth();
    window.location.href = ROUTES.LOGIN;
    return Promise.reject("Session expired");
};

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
        headers: {
            Refresh: `Bearer ${refreshToken}`
        }
    });

    return response.data.accessToken;
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const errorCode = error.response?.data?.code;

        // 로그인 요청은 refresh 대상 제외
        if (originalRequest.url?.includes("/auth/login")) {
            return Promise.reject(error);
        }

        // 401 + INVALID_TOKEN 처리
        if (status === 401 && errorCode === "INVALID_TOKEN" && !originalRequest._retry) {
            // 이미 refresh 진행 중이면 대기열에 추가
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(axiosInstance(originalRequest));
                        },
                        reject
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newAccessToken = await refreshAccessToken();

                // 새 accessToken 저장
                localStorage.setItem("accessToken", newAccessToken);
                useAuthStore.getState().setAuth(newAccessToken);

                processQueue(null, newAccessToken);
                isRefreshing = false;

                // 원래 요청 재시도
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                isRefreshing = false;

                return logout();
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
