// src/hooks/usePwReset.ts
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { findPassword, sendPwResetVerificationCode, verifyEmailCode } from "@/apis/main/auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const usePwReset = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [codeSent, setCodeSent] = useState(false);

    const [verificationStatus, setVerificationStatus] = useState<"success" | "fail" | null>(null);
    const [timer, setTimer] = useState(0);

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if (timer === 0) return;

        const timerId = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timer]);

    const resetPasswordMutation = useMutation({
        mutationFn: () =>
            findPassword({
                code: verificationCode,
                email,
                newPassword: password,
                newPasswordConfirm: confirmPassword,
                passwordMatching: password === confirmPassword
            }),
        onSuccess: () => {
            alert("비밀번호가 변경되었습니다.");
            navigate(ROUTES.LOGIN);
        },
        onError: (err) => {
            console.error("비밀번호 변경 실패", err);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            username: username ? "" : "이름을 입력해주세요.",
            email: email ? "" : "이메일을 입력해주세요.",
            password: password ? "" : "비밀번호를 입력해주세요.",
            confirmPassword: confirmPassword !== password ? "비밀번호가 일치하지 않습니다." : ""
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((v) => v !== "");
        if (hasError) return;

        resetPasswordMutation.mutate(); // mutation 실행
    };

    const handleSendVerificationCode = async () => {
        if (!email) return;
        try {
            await sendPwResetVerificationCode(email);
            setCodeSent(true);

            setVerificationStatus(null); // 이전 인증 결과 초기화
            setTimer(600); // 2분 타이머...
        } catch (err) {
            console.error("인증 코드 전송 실패", err);
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode) return;
        try {
            await verifyEmailCode(email, verificationCode);
            setIsEmailVerified(true);
            setVerificationStatus("success");
            setTimer(0);
        } catch (err) {
            console.error("인증 실패", err);
            setVerificationStatus("fail");
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
        isPending: resetPasswordMutation.isPending,
        verificationStatus,
        timer
    };
};
