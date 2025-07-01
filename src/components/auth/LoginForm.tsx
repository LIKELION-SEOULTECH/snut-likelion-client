import Input from "./Input";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";
import { ROUTES } from "@/constants/routes";

export const LoginForm = () => {
    const {
        email,
        password,
        emailError,
        passwordError,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit
    } = useLogin();

    return (
        <form className="text-white pt-[105px] pb-0 w-[599px] " onSubmit={handleSubmit}>
            <div>
                <Input
                    label="이메일"
                    placeholder="olivia@untitledui.com"
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError}
                />
                <div className="pt-7 "></div>
                <Input
                    label="비밀번호"
                    placeholder="kinglikelion25"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    error={passwordError}
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
                <Link to={ROUTES.REGISTER}>
                    <span className="cursor-pointer">회원가입</span>
                </Link>
            </div>
        </form>
    );
};
