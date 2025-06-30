import axios from "axios";
import { getAccessToken } from "@/utils/token";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});

// accessToken 헤더에 자동 주입
axiosInstance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default axiosInstance;
