import { useLocation } from "react-router-dom";

interface AdminHeaderProps {
    userName: string;
    onToggleDeleteMode?: () => void;
    isDeleteMode?: boolean;
}

export const AdminHeader = ({ userName, onToggleDeleteMode, isDeleteMode }: AdminHeaderProps) => {
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

    const showButtons =
        path.startsWith("/admin/notice") ||
        path.startsWith("/admin/blog") ||
        path.startsWith("/admin/project");

    return (
        <div className="flex h-19 items-center px-10 bg-white justify-between">
            <div className="text-2xl font-bold">{getHeaderText()}</div>
            {showButtons && (
                <div className="flex flex-row text-sm font-medium gap-[9px]">
                    {isDeleteMode ? (
                        <button
                            className="w-[161px] h-11 text-white rounded-sm bg-[#ff7700]"
                            onClick={onToggleDeleteMode}
                        >
                            삭제
                        </button>
                    ) : (
                        <>
                            <button
                                className="w-[161px] h-11 text-[#464A4D] rounded-sm border border-[#ff7700]"
                                onClick={onToggleDeleteMode}
                            >
                                삭제
                            </button>
                            <button className="w-[161px] h-11 text-white rounded-sm bg-[#ff7700]">
                                업로드
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
