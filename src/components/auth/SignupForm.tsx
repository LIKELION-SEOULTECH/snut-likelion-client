import { useState } from "react";
import Input from "@/components/auth/Input";

export const SignupForm = () => {
    const [userType, setUserType] = useState<"운영진" | "아기사자">("아기사자");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [generation, setGeneration] = useState("");
    const [part, setPart] = useState("");
    const [extraField, setExtraField] = useState("");
    const [codeSent, setCodeSent] = useState(false);

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        generation: "",
        part: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            name: name ? "" : "이름을 입력해주세요.",
            email: email ? "" : "이메일을 입력해주세요.",
            password: password ? "" : "비밀번호를 입력해주세요.",
            confirmPassword: confirmPassword !== password ? "비밀번호가 일치하지 않습니다." : "",
            phoneNumber: phoneNumber ? "" : "휴대폰 번호를 입력해주세요.",
            generation: generation ? "" : "기수를 입력해주세요.",
            part: part ? "" : "파트를 선택해주세요."
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((v) => v !== "");
        if (hasError) return;
    };

    return (
        <form className="flex flex-col gap-16 w-150" onSubmit={handleSubmit}>
            {/* 사용자 타입 선택 */}
            <div className="flex gap-11">
                {(["아기사자", "운영진"] as const).map((type) => (
                    <label key={type} className="flex items-center gap-4 cursor-pointer">
                        <div
                            className={`w-9 h-9 rounded-full border-2 transition-colors duration-200 flex items-center justify-center ${
                                userType === type ? "border-white" : "border-[#666666]"
                            }`}
                        >
                            <div
                                className={`w-[22px] h-[22px] rounded-full transition-colors duration-200 ${
                                    userType === type ? "bg-white" : "bg-transparent"
                                }`}
                            />
                        </div>
                        <span
                            className={`text-xl ${userType === type ? "text-white font-semibold" : "text-[#888888] font-medium"}`}
                        >
                            {type}
                        </span>
                        <input
                            type="radio"
                            name="userType"
                            value={type}
                            checked={userType === type}
                            onChange={() => setUserType(type)}
                            className="hidden"
                        />
                    </label>
                ))}
            </div>

            <div className="flex flex-col gap-5">
                <Input
                    label="이름"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    error={errors.name}
                />
                <div className="text-[14px] h-5 text-[#ECECEC]">*실명을 입력해주세요</div>
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
                    onClick={() => setCodeSent(true)}
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
            <Input
                label="기수"
                placeholder="3기"
                value={generation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGeneration(e.target.value)}
                error={errors.generation}
            />
            <div className="flex flex-col gap-2">
                <label className="text-white text-base font-medium">파트</label>
                <div className="relative">
                    <select
                        value={part}
                        onChange={(e) => setPart(e.target.value)}
                        className="w-full appearance-none h-14 px-[14px] border rounded-lg text-xl bg-white text-black outline-none transition-colors border-gray-100 focus:ring-2 focus:ring-blue-200 focus:border-blue-200 [&>*]:bg-white [&>*]:text-black [&>*]:text-xl [&>*]:py-2"
                    >
                        <option value="">선택해주세요</option>
                        <option value="기획">기획</option>
                        <option value="디자인">디자인</option>
                        <option value="프론트엔드">프론트엔드</option>
                        <option value="백엔드">백엔드</option>
                        <option value="AI">AI</option>
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.207l3.71-3.976a.75.75 0 111.08 1.04l-4.25 4.553a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                {errors.part && <p className="text-sm text-red-500 mt-1">{errors.part}</p>}
            </div>

            {userType === "운영진" && (
                <Input
                    label="운영진 추가 필드 (테스트용)"
                    placeholder="추가 정보를 입력하세요"
                    value={extraField}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setExtraField(e.target.value)
                    }
                />
            )}

            <button
                type="submit"
                className="w-full h-14 flex justify-center items-center bg-[#ff7700] rounded-lg font-bold text-xl text-white mt-7 mb-71 cursor-pointer"
            >
                가입하기
            </button>
        </form>
    );
};
