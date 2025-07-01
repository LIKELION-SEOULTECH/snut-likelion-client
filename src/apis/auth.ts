import axiosInstance from "./axiosInstace";
import { setAccessToken, setRefreshToken } from "@/utils/token";

// 로그인
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

// 회원가입
export const register = async (payload: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    isEmailVerified: boolean;
}) => {
    const res = await axiosInstance.post("/auth/register", payload);
    return res.data;
};

// 이메일 인증 코드 전송
export const sendVerificationCode = async (email: string) => {
    const res = await axiosInstance.post(`/auth/email/send?email=${encodeURIComponent(email)}`);
    return res.data;
};

// 이메일 인증 코드 확인
export const verifyEmailCode = async (email: string, code: string) => {
    const res = await axiosInstance.post(`/auth/email/certify?email=${email}&code=${code}`);
    return res.data;
};
