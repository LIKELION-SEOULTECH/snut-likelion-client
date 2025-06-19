import { useState, useRef } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/apis/auth";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailErrorRef = useRef("");
    const passwordErrorRef = useRef("");
    const [, forceUpdate] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        emailErrorRef.current = email ? "" : "이메일을 입력해주세요.";
        passwordErrorRef.current = password ? "" : "비밀번호를 입력해주세요.";

        if (emailErrorRef.current || passwordErrorRef.current) {
            forceUpdate({}); // 에러 UI 반영을 위해 강제 렌더링
            return;
        }
        try {
            const res = await login(email, password);
            console.log(res);
            console.log("로그인 성공", email, password);
            navigate("/");
        } catch (err) {
            console.error("로그인 실패", err);
            passwordErrorRef.current = "이메일 또는 비밀번호가 올바르지 않습니다.";

            forceUpdate({});
        }
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

    return (
        <form className="text-white pt-[105px] pb-0 w-[599px] " onSubmit={handleSubmit}>
            <div>
                <Input
                    label="이메일"
                    placeholder="olivia@untitledui.com"
                    value={email}
                    onChange={handleEmailChange}
                    error={emailErrorRef.current}
                />
                <div className="pt-7 "></div>
                <Input
                    label="비밀번호"
                    placeholder="kinglikelion25"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    error={passwordErrorRef.current}
                />
            </div>
            <button
                type="submit"
                className="w-full h-14 flex justify-center items-center bg-[#ff7700] rounded-lg font-bold text-xl text-white mt-[48px] mb-[28px] cursor-pointer"
            >
                로그인
            </button>
            <div className="flex gap-[17px] text-[#C4C4C4] justify-center ">
                <Link to="/PasswordReset">
                    <span className="cursor-pointer">비밀번호 찾기</span>
                </Link>
                <span className="text-[#666]">|</span>
                <Link to="/signup">
                    <span className="cursor-pointer">회원가입</span>
                </Link>
            </div>
            ㅌ
        </form>
    );
};
