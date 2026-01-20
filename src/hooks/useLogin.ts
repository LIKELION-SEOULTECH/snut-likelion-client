import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "@/apis/auth";
import { useRef, useState } from "react";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailErrorRef = useRef("");
    const passwordErrorRef = useRef("");
    const [, forceUpdate] = useState({});
    const navigate = useNavigate();

    const { mutate: loginMutate, isPending } = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: (data) => {
            console.log("로그인 성공", data); // ✅ 로그인 성공 응답 출력
            navigate("/");
        },
        onError: (err) => {
            console.error("로그인 실패", err);
            passwordErrorRef.current = "이메일 또는 비밀번호가 올바르지 않습니다.";
            forceUpdate({});
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        emailErrorRef.current = email ? "" : "이메일을 입력해주세요.";
        passwordErrorRef.current = password ? "" : "비밀번호를 입력해주세요.";

        if (emailErrorRef.current || passwordErrorRef.current) {
            forceUpdate({});
            return;
        }

        loginMutate();
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (emailErrorRef.current) {
            emailErrorRef.current = "";
            forceUpdate({});
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (passwordErrorRef.current) {
            passwordErrorRef.current = "";
            forceUpdate({});
        }
    };

    return {
        email,
        password,
        emailError: emailErrorRef.current,
        passwordError: passwordErrorRef.current,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit,
        isPending
    };
};
