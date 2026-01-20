import Input from "@/components/auth/Input";
import { useRegister } from "@/hooks/useRegister";
import pwCheckIcon from "@/assets/home/pwCheck.svg";
import pwCheckIcon_gr from "@/assets/home/pwCheck-gr.svg";
import pwCheckIcon_r from "@/assets/home/pwCheck-r.svg";
import { useMemo, useState } from "react";

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
        timer,
        verificationStatus,
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

    const [showErrors, setShowErrors] = useState(false);

    const pwRules = useMemo(() => {
        const lengthRule = password.length >= 10 && password.length <= 16;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[^\w\s]/.test(password);
        const comboRule = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length >= 2;
        return { lengthRule, comboRule };
    }, [password]);

    const RuleItem = ({ text, isValid }: { text: string; isValid: boolean | null }) => {
        const icon = isValid === null ? pwCheckIcon : isValid ? pwCheckIcon_r : pwCheckIcon_gr;
        const color =
            isValid === null ? "text-[#ECECEC]" : isValid ? "text-green-400" : "text-red-500";
        return (
            <p className={`text-[14px] mb-0 flex items-center gap-[10px] ${color}`}>
                <img src={icon} alt="rule icon" />
                {text}
            </p>
        );
    };

    const isFormValid =
        username.trim() !== "" &&
        verificationCode.trim() !== "" &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        phoneNumber.trim() !== "" &&
        pwRules.lengthRule &&
        pwRules.comboRule &&
        verificationStatus === "success";

    const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid) {
            setShowErrors(true);
            return;
        }
        handleSubmit(e);
    };

    return (
        <form className="flex flex-col gap-10 w-150" onSubmit={handleRegisterSubmit}>
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
                    disabled={!email || timer > 0}
                    onClick={handleSendVerificationCode}
                >
                    인증코드 전송
                </button>
            </div>
            <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                    <div className="relative">
                        <Input
                            label="인증코드"
                            placeholder="123456"
                            value={verificationCode}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setVerificationCode(e.target.value)
                            }
                            error={""}
                            disabled={!codeSent}
                        />
                        {verificationStatus !== "success" && (
                            <div className="text-[#F70] font-bold absolute top-12 right-4 ">
                                {timer > 0 &&
                                    `${Math.floor(timer / 60)} : ${String(timer % 60).padStart(2, "0")}`}
                            </div>
                        )}
                    </div>

                    <p
                        className={`${verificationStatus === "success" ? "text-green-400" : "text-red-500"} text-sm h-1 mt-5`}
                    >
                        {verificationStatus === "success"
                            ? "* 인증이 완료되었습니다"
                            : verificationStatus === "fail"
                              ? "* 인증코드가 일치하지 않습니다"
                              : ""}
                    </p>
                </div>
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

            <div className="flex flex-col flex-1 gap-5">
                <Input
                    label="비밀번호"
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    error={errors.password}
                />
                <div className="flex flex-col gap-2">
                    <RuleItem
                        text="영문 대소문자, 숫자, 특수문자가 포함된 10-16자여야 합니다"
                        isValid={password.length === 0 ? null : pwRules.lengthRule}
                    />
                    <RuleItem
                        text="영어 대문자, 소문자, 숫자, 특수문자 중 2종류 문자 조합으로 구성되어야 합니다"
                        isValid={password.length === 0 ? null : pwRules.comboRule}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <Input
                    label="비밀번호 확인"
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setConfirmPassword(e.target.value)
                    }
                    error={errors.confirmPassword}
                />
                {confirmPassword.length > 0 && confirmPassword !== password && (
                    <p className="text-[14px] h-5 text-red-500">*비밀번호와 일치하지 않습니다.</p>
                )}
            </div>
            <div className="flex flex-col gap-5">
                <Input
                    label="휴대폰 번호"
                    placeholder="010-0000-0000"
                    value={phoneNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPhoneNumber(
                            e.target.value
                                .replace(/[^0-9]/g, "")
                                .replace(/^(\d{3})(\d{0,4})(\d{0,4})$/, (_, a, b, c) =>
                                    [a, b, c].filter(Boolean).join("-")
                                )
                        )
                    }
                    maxLength={13}
                    error={errors.phoneNumber}
                />
                {showErrors && (
                    <RuleItem
                        text="필수입력 항목입니다"
                        isValid={phoneNumber.trim().length === 0 ? false : true}
                    />
                )}
            </div>
            <button
                disabled={!isFormValid}
                type="submit"
                className={`w-full h-14 flex justify-center items-center  rounded-lg font-bold text-xl mt-5 mb-71 ${
                    isFormValid
                        ? "bg-[#ff7700] text-white cursor-pointer"
                        : "bg-[#2D2D2D] text-[#666666] cursor-not-allowed"
                }`}
            >
                가입하기
            </button>
        </form>
    );
};
