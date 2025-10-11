import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export const SidebarList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isRecruitOpen, setIsRecruitOpen] = useState(false);

    useEffect(() => {
        if (location.pathname.startsWith("/admin/recruit")) {
            setIsRecruitOpen(true);
        } else {
            setIsRecruitOpen(false);
        }
    }, [location.pathname]);

    const toggleRecruit = () => setIsRecruitOpen((prev) => !prev);
    const menuItems = [
        { name: "멤버 관리", path: "/admin/member" },
        { name: "소식 관리", path: "/admin/notice" },
        { name: "블로그 관리", path: "/admin/blog" },
        { name: "프로젝트 관리", path: "/admin/project" }
    ];

    return (
        <nav className="flex flex-col  text-gray-0 h-full">
            {menuItems.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex items-center px-10 py-[25px] h-[69px] ${isActive ? "bold-16 bg-gray-600" : "medium-16"}`
                    }
                >
                    {item.name}
                </NavLink>
            ))}

            {/* 모집 관리 */}
            <div
                onClick={() => {
                    navigate("/admin/recruit");
                }}
                className={`h-[69px] px-10 py-[25px] cursor-pointer flex items-center justify-between ${
                    location.pathname === "/admin/recruit" ? "font-bold" : "font-medium"
                } ${isRecruitOpen && "bg-[#404040]"}`}
            >
                <span>모집 관리</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${isRecruitOpen ? "rotate-180" : ""}`}
                    onClick={toggleRecruit}
                />
            </div>
            {isRecruitOpen && (
                <div className="flex flex-col">
                    <NavLink
                        to="/admin/recruit/manager"
                        className={({ isActive }) =>
                            `flex items-center h-[69px] px-10 py-[25px] hover:text-white ${
                                isActive ? "font-bold bg-[#3A3A3A]" : "font-medium"
                            } ${isRecruitOpen && "bg-[#3a3a3a]"}`
                        }
                    >
                        운영진 모집
                    </NavLink>
                    <NavLink
                        to="/admin/recruit/user"
                        className={({ isActive }) =>
                            `flex items-center h-[69px] px-10 py-[25px] hover:text-white ${
                                isActive ? "font-bold" : "font-medium"
                            } ${isRecruitOpen && "bg-[#3a3a3a]"}`
                        }
                    >
                        아기사자 모집
                    </NavLink>
                </div>
            )}
        </nav>
    );
};
