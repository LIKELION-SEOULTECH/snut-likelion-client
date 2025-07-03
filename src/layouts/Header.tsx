import { useNavigate, useLocation } from "react-router-dom";
import LikeLionLogo from "@/assets/Header/likelion_logo.svg?react";
import { LoginSignupBtn } from "@/components/Header/LoginSignupBtn";
import { ROUTES } from "@/constants/routes";
import { useEffect, useState } from "react";
import { MyIcon } from "@/components/Header/MyIcon";
import { fetchMyMemberInfo } from "@/apis/members";
import { fetchRecentRecruitment } from "@/apis/recruit";

interface HeaderProps {
    white?: boolean;
}

export const Header = ({ white = false }: HeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const [isGuest, setIsGuest] = useState<boolean | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            const token = localStorage.getItem("accessToken");
            const role = localStorage.getItem("userRole");

            // 토큰이 없거나, 게스트라면 API 호출x
            const guest = role === "ROLE_GUEST";
            setIsLoggedIn(!!token);
            setIsGuest(guest);
            if (!token || guest) return;

            try {
                const res = await fetchMyMemberInfo();
                setProfileImage(res.profileImageUrl);
            } catch (err) {
                console.warn("Header: fetchMyMemberInfo 실패", err);
            }
        };

        loadProfile();
    }, []);

    const navItems = [
        { name: "모집안내", route: ROUTES.HOME },
        { name: "프로젝트", route: ROUTES.PROJECT },
        { name: "블로그", route: ROUTES.BLOG },
        { name: "멤버", route: ROUTES.MEMBER },
        { name: "소식", route: ROUTES.NEWS }
    ];

    const handleGuestRecruit = async () => {
        try {
            // MEMBER, MANAGER 모집일정
            const [memberRes, managerRes] = await Promise.all([
                fetchRecentRecruitment("MEMBER"),
                fetchRecentRecruitment("MANAGER")
            ]);

            const now = new Date();
            const mOpen = new Date(managerRes.data.openDate);
            const mClose = new Date(managerRes.data.closeDate);
            const uOpen = new Date(memberRes.data.openDate);
            const uClose = new Date(memberRes.data.closeDate);

            // 기간
            console.log(
                `[운영진] ${managerRes.data.generation}기 → open: ${mOpen.toLocaleString()}, close: ${mClose.toLocaleString()}`
            );
            console.log(
                `[멤버]     ${memberRes.data.generation}기 → open: ${uOpen.toLocaleString()}, close: ${uClose.toLocaleString()}`
            );

            // 운영진 지원 가능
            if (mOpen <= now && now <= mClose) {
                navigate(ROUTES.RECRUIT_MANAGER);
                return;
            }
            // 멤버 지원 가능 기간
            if (uOpen <= now && now <= uClose) {
                navigate(ROUTES.RECRUIT_MEMBER);
                return;
            }

            // 지원기간 ㄴㄴ
            const upcoming: Array<{ type: "MANAGER" | "MEMBER"; open: Date }> = [];
            if (mOpen > now) upcoming.push({ type: "MANAGER", open: mOpen });
            if (uOpen > now) upcoming.push({ type: "MEMBER", open: uOpen });

            if (upcoming.length > 0) {
                // openDate 기준  → 가장 가까운 기간에 모집인곳
                upcoming.sort((a, b) => a.open.getTime() - b.open.getTime());
                const next = upcoming[0];
                if (next.type === "MANAGER") {
                    navigate(ROUTES.RECRUIT_MANAGER);
                } else {
                    navigate(ROUTES.RECRUIT_MEMBER);
                }
                return;
            }
            navigate(ROUTES.RECRUIT_MEMBER);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className={`w-full h-[54px] sm:h-24 flex flex-row justify-start px-4 sm:px-0 sm:justify-center relative ${
                white
                    ? "bg-white/60 border-b border-[#ECECEC] backdrop-blur-[35px]"
                    : "bg-[#000000]"
            }`}
        >
            <div className="absolute bottom-0 left-0 w-full h-[0.6px] bg-gradient-to-r from-transparent via-white to-transparent opacity-100 pointer-events-none" />

            <div className="flex">
                <div className="flex flex-row justify-center items-center gap-[267px]">
                    <div className="w-[38.12px] h-5 sm:w-[61px] sm:h-8">
                        <LikeLionLogo
                            className="cursor-pointer"
                            onClick={() => navigate(ROUTES.ADMIN_MEMBER)}
                        />
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
                                               ${white ? "hover:text-black hover:font-bold" : "hover:text-white hover:font-bold"}
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
                                    className="w-[109px] h-[33px] px-[16px] py-[4px] border-[1px] text-[#F70] border-[#F70] rounded rounded-[100px] cursor-pointer text-[14px] "
                                    onClick={
                                        !isGuest
                                            ? () => navigate(ROUTES.BLOG_POST)
                                            : handleGuestRecruit
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
