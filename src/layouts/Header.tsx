import { useNavigate, useLocation } from "react-router-dom";
import LikeLionLogo from "@/assets/Header/likelion_logo.svg?react";
import { LoginSignupBtn } from "@/components/Header/LoginSignupBtn";
import { ROUTES } from "@/constants/routes";

interface HeaderProps {
    white?: boolean;
}

export const Header = ({ white = false }: HeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: "모집안내", route: ROUTES.HOME },
        { name: "프로젝트", route: ROUTES.PROJECT },
        { name: "블로그", route: ROUTES.BLOG },
        { name: "멤버", route: ROUTES.MEMBER },
        { name: "소식", route: ROUTES.NEWS ),
    ];

    return (
        <div
            className={`w-full h-24 flex flex-row justify-center ${
                white
                    ? "bg-white/60 border-b border-[#ECECEC] backdrop-blur-[35px]"
                    : "bg-[#000000]"
            }`}
        >
            <div className="flex justify-center items-center">
                <div className="flex flex-row justify-center items-center gap-[267px]">
                    <LikeLionLogo
                        className="cursor-pointer"
                        onClick={() => navigate(ROUTES.HOME)}
                    />

                    <div className="flex flex-row gap-[206px] items-center whitespace-nowrap">
                        <div className="flex flex-row gap-22 text-16 font-medium items-center">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.route;

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
                        <LoginSignupBtn />
                    </div>
                </div>
            </div>
        </div>
    );
};
