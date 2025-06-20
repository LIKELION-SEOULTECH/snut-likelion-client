import Input from "@/components/auth/Input";
import { useRegister } from "@/hooks/useRegister";

export const RegisterForm = () => {
    const {
        username,
        email,
        verificationCode,
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
        handleVerifyCode
    } = useRegister();

    return (
        <form className="flex flex-col gap-10 w-150" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
                <Input
                    label="이름"
                    placeholder="이름을 입력하세요"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUsername(e.target.value)
                    }
                    error={errors.username}
                />
                <div className="text-[14px] h-5 text-[#ECECEC] mb-6">*실명을 입력해주세요</div>
            </div>

            <div className="flex flex-row gap-4">
                <Input
                    label="이메일"
                    placeholder="olivia@untitledui.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    error={errors.email}
                />
                <button
                    type="button"
                    className={`w-[173px] h-14 text-xl font-medium rounded-lg mt-8 flex-shrink-0 ${email ? "cursor-pointer" : "cursor-not-allowed"}`}
                    style={{
                        backgroundColor: email ? "#666666" : "#2D2D2D",
                        color: email ? "white" : "#666666"
                    }}
                    disabled={!email}
                    onClick={handleSendVerificationCode}
                >
                    인증코드 전송
                </button>
            </div>

            <div className="flex flex-row gap-4">
                <Input
                    label="인증코드"
                    placeholder="Verification code"
                    value={verificationCode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setVerificationCode(e.target.value)
                    }
                    error={""}
                    disabled={!codeSent}
                />
                <button
                    type="button"
                    className={`w-[173px] h-14 text-xl font-medium rounded-lg mt-8 flex-shrink-0 ${email ? "cursor-pointer" : "cursor-not-allowed"}`}
                    style={{
                        backgroundColor: verificationCode ? "#666666" : "#2D2D2D",
                        color: verificationCode ? "white" : "#666666"
                    }}
                    disabled={!verificationCode}
                    onClick={handleVerifyCode}
                >
                    인증코드 인증
                </button>
            </div>

            <Input
                label="비밀번호"
                placeholder="비밀번호 규칙...어캐 하지"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                error={errors.password}
            />

            <Input
                label="비밀번호 확인"
                placeholder="비밀번호 규칙...어캐 하지"
                type="password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                }
                error={errors.confirmPassword}
            />

            <Input
                label="휴대폰 번호"
                placeholder="010-0000-0000"
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPhoneNumber(e.target.value)
                }
                error={errors.phoneNumber}
            />

            <button
                type="submit"
                className="w-full h-14 flex justify-center items-center bg-[#ff7700] rounded-lg font-bold text-xl text-white mt-13 mb-71 cursor-pointer"
            >
                가입하기
            </button>
        </form>
    );
};
