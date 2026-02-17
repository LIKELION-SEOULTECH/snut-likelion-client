import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { findPassword, sendPwResetVerificationCode } from "@/apis/main/auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const usePwReset = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [emailVerifiedCode, setEmailVerifiedCode] = useState("");
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
        confirmPassword: "",
        phoneNumber: ""
    });

    useEffect(() => {
        if (timer === 0) return;

        const timerId = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timer]);

    const registerMutation = useMutation({
        mutationFn: () =>
            findPassword({
                code: emailVerifiedCode,
                email,
                newPassword: password,
                newPasswordConfirm: confirmPassword,
                passwordMatching: password === confirmPassword
            }),
        onSuccess: () => {
            alert("비밀번호 찾기가 완료되었습니다!");
            navigate(ROUTES.LOGIN);
        },
        onError: (err) => {
            console.error("비밀번호 찾기 실패", err);
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

        registerMutation.mutate();
    };

    const handleSendVerificationCode = async () => {
        if (!email) return;
        try {
            await sendPwResetVerificationCode(email);
            setCodeSent(true);

            setVerificationStatus(null);
            setTimer(120);
        } catch (err) {
            console.error("인증 코드 전송 실패", err);
        }
    };

    return {
        username,
        email,
        emailVerifiedCode,
        password,
        confirmPassword,
        phoneNumber,
        codeSent,
        errors,
        setUsername,
        setEmail,
        setEmailVerifiedCode,
        setPassword,
        setConfirmPassword,
        setPhoneNumber,
        handleSubmit,
        handleSendVerificationCode,
        isPending: registerMutation.isPending,
        verificationStatus,
        timer
    };
};
