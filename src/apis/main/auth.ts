import { useAuthStore } from "@/stores/useAuthStore";
import axiosInstance from "../axiosInstance";
import axios from "axios";

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

// 로그인
export const login = async (email: string, password: string) => {
    const res = await axiosInstance.post("/auth/login", {
        email,
        password
    });

    const { accessToken, refreshToken } = res.data;

    useAuthStore.getState().setAuth(accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return res.data;
};

// 로그아웃
export const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,

        {},
        {
            headers: {
                Refresh: `Bearer ${refreshToken}`
            }
        }
    );
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

// 비밀번호 찾기 코드 전송
export const sendPwFindCode = async (email: string) => {
    const res = await axiosInstance.post(`/auth/email/send?email=${encodeURIComponent(email)}`);
    return res.data;
};

// 비밀번호 찾기 이메일 인증 코드 전송
export const sendPwResetVerificationCode = async (email: string) => {
    const res = await axiosInstance.post(`/auth/password/find?email=${encodeURIComponent(email)}`);
    return res.data;
};

// 비밀번호 찾기
export const findPassword = async (payload: {
    code: string;
    email: string;
    newPassword: string;
    newPasswordConfirm: string;
    passwordMatching: boolean;
}) => {
    const res = await axiosInstance.patch("/auth/password/reset", payload);
    return res.data;
};

export interface PasswordChangeRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    passwordMatching: boolean;
}

// 비밀번호 재설정 요청
export const changePassword = async (data: PasswordChangeRequest) => {
    const res = await axiosInstance.patch("/auth/password/change", data);
    return res.data;
};
