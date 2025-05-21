import LikeLionLogo from "@/assets/Header/likelion_logo.svg?react";
import { LoginSignupBtn } from "@/components/Header/LoginSignupBtn";

export const Header = () => {
    return (
        <div className="w-full h-24 flex flex-row justify-center bg-[#000000] text-[#ffffff]">
            <div className="flex justify-center items-center">
                <div className="flex flex-row justify-center items-center gap-[267px]">
                    <LikeLionLogo />

                    <div className="flex flex-row gap-[206px] items-center whitespace-nowrap">
                        <div className="flex flex-row gap-22 text-16 opacity-60 font-medium items-center">
                            <div className="cursor-pointer">모집안내</div>
                            <div className="cursor-pointer">프로젝트</div>
                            <div className="cursor-pointer">멤버</div>
                            <div className="cursor-pointer">블로그</div>
                            <div className="cursor-pointer">소식</div>
                        </div>
                        <LoginSignupBtn />
                    </div>
                </div>
            </div>
        </div>
    );
};
