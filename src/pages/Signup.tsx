import { SignupForm } from "@/components/auth/SignupForm";
import PageLayout from "@/layouts/PageLayout";

export const SignupPage = () => {
    return (
        <PageLayout>
            <div className="px-[110px] flex flex-col">
                <div className="flex flex-col gap-[6px] text-[22px] text-[#C4C4C4] leading-[130%] mt-[98px]">
                    <div className=" font-semibold tracking-tight">LIKELION</div>
                    <div className="flex flex-row gap-2">
                        <span className="font-light">WITH</span>
                        <span className="font-semibold tracking-tight">SEOULTECH</span>
                    </div>
                </div>

                <div className="flex flex-row mt-[41px] gap-[273px]">
                    <div>
                        <div className="font-extrabold text-7xl">
                            <span className="text-white">Welcome</span>
                            <span className="text-[#FF7700]">.</span>
                        </div>
                        <button className="w-38 h-11 bg-[#404040] text-white rounded-full mt-18 cursor-pointer">
                            ← 로그인 화면으로
                        </button>
                    </div>
                    {/* 회원가입 폼 */}
                    <div className="w-150">
                        <SignupForm />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};
