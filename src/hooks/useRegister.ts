// src/hooks/useSignupForm.ts
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register, sendVerificationCode, verifyEmailCode } from "@/apis/auth";

export const useRegister = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [codeSent, setCodeSent] = useState(false);

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: ""
    });

    const registerMutation = useMutation({
        mutationFn: () =>
            register({
                email,
                username,
                password,
                confirmPassword,
                phoneNumber,
                isEmailVerified
            }),
        onSuccess: (res) => {
            console.log("회원가입 성공", res);
        },
        onError: (err) => {
            console.error("회원가입 실패", err);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            username: username ? "" : "이름을 입력해주세요.",
            email: email ? "" : "이메일을 입력해주세요.",
            password: password ? "" : "비밀번호를 입력해주세요.",
            confirmPassword: confirmPassword !== password ? "비밀번호가 일치하지 않습니다." : "",
            phoneNumber: phoneNumber ? "" : "휴대폰 번호를 입력해주세요."
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((v) => v !== "");
        if (hasError) return;

        registerMutation.mutate(); // mutation 실행
    };

    const handleSendVerificationCode = async () => {
        if (!email) return;
        try {
            await sendVerificationCode(email);
            setCodeSent(true);
            console.log("인증 코드 전송 완료");
        } catch (err) {
            console.error("인증 코드 전송 실패", err);
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode) return;
        try {
            await verifyEmailCode(email, verificationCode);
            console.log("인증 성공");
            setIsEmailVerified(true);
        } catch (err) {
            console.error("인증 실패", err);
        }
    };

    return {
        username,
        email,
        verificationCode,
        isEmailVerified,
        password,
        confirmPassword,
        phoneNumber,
        codeSent,
        errors,
        setUsername,
        setEmail,
        setVerificationCode,
        setPassword,
        setConfirmPassword,
        setPhoneNumber,
        handleSubmit,
        handleSendVerificationCode,
        handleVerifyCode,
        isPending: registerMutation.isPending
    };
};
