import { useState } from "react";
import Input from "./Input";
import { sendPasswordResetCode } from "@/apis/auth";

export const PasswordResetForm = () => {
    const [email, setEmail] = useState("");

    const [errors, setErrors] = useState({
        email: ""
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            email: email ? "" : "이메일을 입력해주세요."
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((v) => v !== "");
        if (hasError) return;

        try {
            await sendPasswordResetCode(email);
            console.log("메일을 보냈습니다.");
        } catch (err) {
            console.error("메일 발송 실패:", err);
        }
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
                <button
                    type="submit"
                    className="w-full h-14 flex justify-center items-center bg-[#ff7700] rounded-lg font-bold text-xl text-white mt-[48px] mb-[53px] cursor-pointer"
                >
                    메일 발송
                </button>
            </div>
        </form>
    );
};
