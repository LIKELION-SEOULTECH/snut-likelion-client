import { ChevronDown } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSidebarStore } from "@/stores/useSidebarStore";

export const SidebarList = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { isRecruitOpen, toggleRecruit, openRecruit } = useSidebarStore();

    const menuItems = [
        { name: "멤버 관리", path: "/admin/member" },
        { name: "소식 관리", path: "/admin/notice" },
        { name: "블로그 관리", path: "/admin/blog" },
        { name: "프로젝트 관리", path: "/admin/project" }
    ];

    const isRecruitRoot = location.pathname === "/admin/recruit";
    const isManager =
        location.pathname === "/admin/recruit/manager" ||
        location.pathname === "/admin/recruit/apply-manager";

    const isUser =
        location.pathname === "/admin/recruit/user" ||
        location.pathname === "/admin/recruit/apply-user";

    useEffect(() => {
        if (location.pathname.startsWith("/admin/recruit")) {
            openRecruit();
        }
    }, [location.pathname, openRecruit]);

    return (
        <nav className="flex flex-col text-gray-0 h-full">
            {menuItems.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex items-center px-10 py-[25px] h-[69px] ${
                            isActive ? "bold-16 bg-gray-600" : "medium-16"
                        }`
                    }
                >
                    {item.name}
                </NavLink>
            ))}

            {/* 모집 관리 */}
            <div
                className={`h-[69px] px-10 py-[25px] cursor-pointer flex items-center justify-between
          ${isRecruitOpen ? (isRecruitRoot ? "bg-gray-500 font-bold" : "bg-gray-800") : "bg-gray-700 font-medium"}
        `}
                onClick={() => {
                    navigate("/admin/recruit");
                    openRecruit();
                }}
            >
                <span>모집 관리</span>

                <ChevronDown
                    className={`w-4 h-4 transition-transform ${isRecruitOpen ? "rotate-180" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleRecruit();
                    }}
                />
            </div>

            {isRecruitOpen && (
                <div className="flex flex-col">
                    <NavLink
                        to="/admin/recruit/manager"
                        className={() =>
                            `flex items-center h-[69px] px-10 py-[25px]
              ${isManager ? "font-bold bg-gray-500" : "font-medium bg-gray-800"}`
                        }
                    >
                        운영진 지원자 관리
                    </NavLink>

                    <NavLink
                        to="/admin/recruit/user"
                        className={() =>
                            `flex items-center h-[69px] px-10 py-[25px]
              ${isUser ? "font-bold bg-gray-500" : "font-medium bg-gray-800"}`
                        }
                    >
                        아기사자 지원자 관리
                    </NavLink>
                </div>
            )}
        </nav>
    );
};
