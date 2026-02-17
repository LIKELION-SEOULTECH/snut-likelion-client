import { useNavigate, useLocation } from "react-router-dom";
import LikeLionLogo from "@/assets/Header/likelion_logo.svg?react";
import { ROUTES } from "@/routes/routes";
import { fetchMyMemberInfo } from "@/apis/main/member";
import { MyIcon } from "@/components/Header/MyIcon";
import { LoginSignupBtn } from "@/components/Header/LoginSignupBtn";
import { useQuery } from "@tanstack/react-query";
import type { MemberDetailResponse } from "@/types/member";
import { getRoleFromToken } from "@/utils/auth";
import { useCombinedRecruitment } from "@/hooks/useCombinedRecruitment";

interface HeaderProps {
    white?: boolean;
}

export const Header = ({ white = false }: HeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const accessToken = localStorage.getItem("accessToken");
    const role = getRoleFromToken();

    const isLoggedIn = !!accessToken;
    const isGuest = role === "ROLE_GUEST";

    const { data: member } = useQuery<MemberDetailResponse>({
        queryKey: ["me"],
        queryFn: fetchMyMemberInfo,
        enabled: isLoggedIn && !isGuest,
        staleTime: 1000 * 60 * 5,
    });

    const profileImage = member?.profileImageUrl;

    const navItems = [
        { name: "모집안내", route: ROUTES.HOME },
        { name: "프로젝트", route: ROUTES.PROJECT },
        { name: "블로그", route: ROUTES.BLOG },
        { name: "멤버", route: ROUTES.MEMBER },
        { name: "소식", route: ROUTES.NOTICE },
    ];

            // MEMBER, MANAGER 모집일정
    const { buttonType } = useCombinedRecruitment();

    const handleApplyButtonClick = () => {
        if (buttonType === "MANAGER_APPLY") {
            navigate(ROUTES.RECRUIT_MANAGER);
        } else {
            navigate(ROUTES.RECRUIT_MEMBER);
        }
    };

    const handleLogoClick = () => {
        navigate(ROUTES.HOME);
    };

    return (
        <div
            className={`w-full min-w-330 h-[54px] sm:h-24 flex flex-row justify-start px-auto sm:px-0 sm:justify-center relative ${
                white
                    ? "bg-white/60 border-b border-[#ECECEC] backdrop-blur-[35px]"
                    : "bg-[#000000]"
            }`}
        >
            <div className="absolute bottom-0 left-0 w-full h-[0.6px] bg-gradient-to-r from-transparent via-white to-transparent opacity-100 pointer-events-none" />

            <div className="flex">
                <div className="flex flex-row justify-center items-center gap-[267px]">
                    <div className="w-[38.12px] h-5 sm:w-[61px] sm:h-8">
                        <LikeLionLogo className="cursor-pointer" onClick={handleLogoClick} />
                    </div>

                    <div className="hidden sm:flex flex-row gap-[206px] sm:items-center whitespace-nowrap">
                        <div className="flex flex-row gap-22 text-16 font-medium items-center">
                            {navItems.map((item) => {
                                const isActive =
                                    item.route === "/"
                                        ? location.pathname === "/"
                                        : location.pathname.startsWith(item.route);
                                return (
                                    <div
                                        key={item.name}
                                        className={`cursor-pointer transition-all duration-200 
                                            ${
                                                white
                                                    ? isActive
                                                        ? "text-black font-bold"
                                                        : "text-black/60"
                                                    : isActive
                                                      ? "text-white font-bold"
                                                      : "text-white/60"
                                            }                                            
                                               ${
                                                   white
                                                       ? "hover:text-black hover:font-bold"
                                                       : "hover:text-white hover:font-bold"
                                               }
`}
                                        onClick={() => navigate(item.route)}
                                    >
                                        {item.name}
                                    </div>
                                );
                            })}
                        </div>
                        {isLoggedIn ? (
                            <div className="flex  gap-4 items-center">
                                <button
                                    className="w-[109px] h-[33px] px-[16px] py-[4px] border-[1px] text-[#F70] border-[#F70] rounded-[100px] cursor-pointer text-[14px] "
                                    onClick={
                                        !isGuest
                                            ? () => navigate(ROUTES.BLOG_POST)
                                            : handleApplyButtonClick
                                    }
                                >
                                    {!isGuest ? "블로그 글쓰기" : "지원하기"}
                                </button>
                                <MyIcon
                                    onClick={() => navigate(ROUTES.MYPAGE)}
                                    profileImageUrl={profileImage}
                                />
                            </div>
                        ) : (
                            <LoginSignupBtn onClick={() => navigate(ROUTES.LOGIN)} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
