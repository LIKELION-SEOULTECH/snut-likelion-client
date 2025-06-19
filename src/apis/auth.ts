import axiosInstance from "./axiosInstace";
import { setAccessToken, setRefreshToken } from "@/utils/token";

export const login = async (email: string, password: string) => {
    const res = await axiosInstance.post("/auth/login", {
        email,
        password
    });

    const { accessToken, refreshToken } = res.data;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    return res.data;
};
