// src/hooks/useSignupForm.ts
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register, sendVerificationCode, verifyEmailCode } from "@/apis/main/auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const useRegister = () => {
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
    const [timerId, setTimerId] = useState<ReturnType<typeof setInterval> | null>(null);

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
            alert("회원가입이 완료되었습니다!");
            navigate(ROUTES.LOGIN);
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

            setVerificationStatus(null); // 이전 인증 결과 초기화
            setTimer(120); // 2분 타이머...

            if (timerId) clearInterval(timerId);
            const id = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(id);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            setTimerId(id);
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
            setVerificationStatus("success");
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
        isPending: registerMutation.isPending,

        verificationStatus,
        timer
    };
};
