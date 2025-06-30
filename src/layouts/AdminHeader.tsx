import { useLocation } from "react-router-dom";

interface AdminHeaderProps {
    userName: string;
}

export const AdminHeader = ({ userName }: AdminHeaderProps) => {
    const location = useLocation();
    const path = location.pathname;

    const getHeaderText = () => {
        if (path === "/admin") return `${userName}님, 안녕하세요!`;
        if (path.startsWith("/admin/member")) return "멤버 관리";
        if (path.startsWith("/admin/notice")) return "소식 관리";
        if (path.startsWith("/admin/blog")) return "블로그 관리";
        if (path.startsWith("/admin/project")) return "프로젝트 관리";
        if (path.startsWith("/admin/recruit")) return "모집 관리";
        return "";
    };

    return (
        <div className="flex h-19 items-center px-10 bg-white">
            <div className="text-2xl font-bold">{getHeaderText()}</div>
        </div>
    );
};
