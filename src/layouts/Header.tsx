import { useNavigate, useLocation } from "react-router-dom";
import LikeLionLogo from "@/assets/Header/likelion_logo.svg?react";
import { LoginSignupBtn } from "@/components/Header/LoginSignupBtn";
import { ROUTES } from "@/constants/routes";

export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: "모집안내", route: ROUTES.HOME },
        { name: "프로젝트", route: ROUTES.PROJECT },
        { name: "멤버", route: ROUTES.MEMBER },
        { name: "블로그", route: ROUTES.HOME },
        { name: "소식", route: ROUTES.HOME }
    ];

    return (
        <div className="w-full h-24 flex flex-row justify-center bg-[#000000] text-[#ffffff]">
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
                                            ${isActive ? "text-white font-bold" : "text-white/60"} 
                                            hover:text-white hover:font-bold`}
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
