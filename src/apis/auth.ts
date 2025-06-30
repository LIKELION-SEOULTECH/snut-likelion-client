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
    const res = await axiosInstance.post(`/auth/email/send`, { email });
    return res.data;
};

// 이메일 인증 코드 확인
export const verifyEmailCode = async (email: string, code: string) => {
    const res = await axiosInstance.post(`/auth/email/certify`, { email, code });
    return res.data;
};

// 비밀번호 찾기 코드 전송
export const sendPasswordResetCode = (email: string) => {
    return axiosInstance.post("/auth/email/send", null, {
        params: { email }
    });
};

// 비밀번호 재설정
export const resetPassword = (data: { email: string; code: string; newPassword: string }) => {
    return axiosInstance.patch("/api/v1/auth/password/change", data);
};

// 비밀번호 변경 (로그인된 사용자용)
export const changePassword = (data: { currentPassword: string; newPassword: string }) => {
    return axiosInstance.patch("/api/v1/auth/password/change", data);
};
