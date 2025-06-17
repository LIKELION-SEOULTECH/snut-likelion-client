import { useState } from "react";
import Input from "./Input";
import { Link } from "react-router-dom";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            email: email ? "" : "이메일을 입력해주세요.",
            password: password ? "" : "비밀번호를 입력해주세요."
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((v) => v !== "");
        if (hasError) return;
    };
    return (
        <form className="text-white pt-[105px] pb-0 w-[599px] " onSubmit={handleSubmit}>
            <div>
                <Input
                    label="이메일"
                    placeholder="olivia@untitledui.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    error={errors.email}
                />
                <p className="pt-7 "> </p>
                <Input
                    label="비밀번호"
                    placeholder="kinglikelion25"
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    error={errors.password}
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
        </form>
    );
};
