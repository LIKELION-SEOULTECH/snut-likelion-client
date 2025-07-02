import { useLocation, useNavigate } from "react-router-dom";

interface AdminHeaderProps {
    isFormValid?: boolean;
    onToggleDeleteMode?: () => void;
    isDeleteMode?: boolean;
    onSubmit?: () => void;
}

export const AdminHeader = ({
    isFormValid,
    onToggleDeleteMode,
    isDeleteMode,
    onSubmit
}: AdminHeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const getHeaderText = () => {
        if (path.startsWith("/admin/member")) return "멤버 관리";
        if (path.startsWith("/admin/notice")) {
            if (path === "/admin/notice/create") return "소식 등록";
            if (path.includes("/edit")) return "소식 수정";
            if (/\d+$/.test(path) || path.includes("/detail")) return "소식 상세";
            return "소식 관리";
        }
        if (path.startsWith("/admin/blog")) return "블로그 관리";

        if (path.startsWith("/admin/project")) {
            if (path.startsWith("/admin/project/create")) return "프로젝트 업로드";
            if (path.includes("/edit")) return "프로젝트 수정";
            return "프로젝트 관리";
        }
        if (path.startsWith("/admin/recruit")) return "모집 관리";
        return "";
    };

    const showButtons =
        path.startsWith("/admin/notice") ||
        path.startsWith("/admin/blog") ||
        path.startsWith("/admin/project");

    const renderButtons = () => {
        if (path === "/admin/notice/create") {
            return (
                <button
                    className="w-[161px] h-11 text-white rounded-sm bg-[#ff7700]"
                    onClick={onSubmit}
                >
                    업로드
                </button>
            );
        }

        if (path === "/admin/project/create") {
            return (
                <button
                    className={`w-[161px] h-11 text-white rounded-sm ${
                        isFormValid ? "bg-[#ff7700]" : "bg-[#E0E0E0] cursor-not-allowed"
                    }`}
                    disabled={!isFormValid}
                    onClick={onSubmit}
                >
                    업로드
                </button>
            );
        }

        if (path.includes("/notice/edit")) {
            return (
                <button className="w-[161px] h-11 text-white rounded-sm bg-[#ff7700]">
                    수정하기
                </button>
            );
        }

        if (path.includes("/project/edit")) {
            return (
                <button
                    className="w-[161px] h-11 text-white rounded-sm bg-[#ff7700]"
                    onClick={onSubmit}
                >
                    수정
                </button>
            );
        }

        if (/\d+$/.test(path) || path.includes("/detail")) {
            return (
                <>
                    <button className="w-[161px] h-11 text-[#464A4D] rounded-sm border border-[#ff7700]">
                        삭제
                    </button>
                    <button className="w-[161px] h-11 text-white rounded-sm bg-[#ff7700]">
                        수정
                    </button>
                </>
            );
        }

        if (
            path.startsWith("/admin/notice") ||
            path.startsWith("/admin/blog") ||
            path.startsWith("/admin/project")
        ) {
            return isDeleteMode ? (
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
                    <button
                        className="w-[161px] h-11 text-white rounded-sm bg-[#ff7700]"
                        onClick={() => navigate("create")}
                    >
                        업로드
                    </button>
                </>
            );
        }

        return null;
    };

    return (
        <div className="flex h-19 items-center px-10 bg-white justify-between">
            <div className="text-2xl font-bold">{getHeaderText()}</div>
            {showButtons && (
                <div className="flex flex-row text-sm font-medium gap-[9px]">{renderButtons()}</div>
            )}
        </div>
    );
};
