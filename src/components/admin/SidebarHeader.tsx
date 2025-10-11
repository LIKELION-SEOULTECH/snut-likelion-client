import Logo from "@/assets/Header/likelion_logo.svg?react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ABS } from "@/routes/routes";

export const SidebarHeader = () => {
    const navigate = useNavigate();
    return (
        <div
            className="flex items-center gap-[9px] h-20 px-10 cursor-pointer"
            onClick={() => navigate(ADMIN_ABS.MEMBER)}
        >
            <Logo />
            <span className="text-gray-0 medium-28 pr-[38px]">Admin</span>
        </div>
    );
};
