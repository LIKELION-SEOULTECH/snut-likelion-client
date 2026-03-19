import { RegisterForm } from "@/components/auth/RegisterForm";
import QuoteCardList from "@/components/project/QuoteCardList";
import PageLayout from "@/layouts/PageLayout";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
    return (
        <PageLayout>
            <div
                className="px-5 sm:px-[110px] flex flex-col"
                style={{
                    background: "linear-gradient(180deg, #000 0%, #1B1B1B 29.27%)"
                }}
            >
                <div className="flex-col gap-[6px] text-[22px] text-[#C4C4C4] leading-[130%] mt-[98px] hidden sm:flex">
                    <div className=" font-semibold tracking-tight">LIKELION</div>
                    <div className="flex flex-row gap-2">
                        <span className="font-light">WITH</span>
                        <span className="font-semibold tracking-tight">SEOULTECH</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between mt-23 sm:mt-[41px]">
                    <div className="flex-1 pr-0 sm:pr-10">
                        <div className="flex justify-center font-extrabold text-[35px] sm:text-7xl mb-[54px] sm:mb-0">
                            <span className="text-white">Welcome</span>
                            <span className="text-[#FF7700]">.</span>
                        </div>
                        <Link to="/login" className="hidden sm:block">
                            <button className="w-38 h-11 bg-[#404040] text-white rounded-full mt-18 cursor-pointer">
                                ← 로그인 화면으로
                            </button>
                        </Link>
                    </div>
                    {/* 회원가입 폼 */}
                    <div className="flex-1 sm:w-150">
                        <RegisterForm />
                    </div>
                </div>
            </div>
            <div className="w-full h-[150px] px-28 bg-[#1B1B1B] hidden sm:block">
                <QuoteCardList />
            </div>
        </PageLayout>
    );
};
