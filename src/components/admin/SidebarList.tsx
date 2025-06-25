import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

export const SidebarList = () => {
    const [isRecruitOpen, setIsRecruitOpen] = useState(false);

    const toggleRecruit = () => setIsRecruitOpen((prev) => !prev);

    const menuItems = [
        { name: "멤버 관리", path: "/admin/member" },
        { name: "소식 관리", path: "/admin/news" },
        { name: "블로그 관리", path: "/admin/blog" },
        { name: "프로젝트 관리", path: "/admin/project" }
    ];

    return (
        <nav className="flex flex-col  text-white text-base h-full">
            {menuItems.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                        `px-10 py-[25px] h-[69px] ${isActive ? "font-bold" : "font-medium"}`
                    }
                >
                    {item.name}
                </NavLink>
            ))}

            {/* 모집 관리 */}
            <div
                className="h-[69px] px-10 py-[25px] cursor-pointer flex items-center justify-between"
                onClick={toggleRecruit}
            >
                <span>모집 관리</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${isRecruitOpen ? "rotate-180" : ""}`}
                />
            </div>
            {isRecruitOpen && (
                <div className="flex flex-col">
                    <NavLink
                        to="/admin/recruit/manager"
                        className="h-[69px] px-10 py-[25px] hover:text-white"
                    >
                        운영진 모집
                    </NavLink>
                    <NavLink
                        to="/admin/recruit/user"
                        className="h-[69px] px-10 py-[25px] hover:text-white"
                    >
                        아기사자 모집
                    </NavLink>
                </div>
            )}
        </nav>
    );
};
