import { useLocation, useNavigate } from "react-router-dom";
import BackBtn from "@/assets/admin/back-btn.svg?react";

interface AdminHeaderProps {
    userName: string;
    onSubmit?: () => void;
}

export const AdminHeader = ({ userName, onSubmit }: AdminHeaderProps) => {
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const getHeaderText = () => {
        if (path === "/admin") return `${userName}님, 안녕하세요!`;
        if (path.startsWith("/admin/member")) return "멤버 관리";
        if (path.startsWith("/admin/notice")) return "소식 관리";
        if (path.startsWith("/admin/blog")) return "블로그 관리";
        if (path.startsWith("/admin/project")) return "프로젝트 관리";
        if (path.startsWith("/admin/recruit/result/user")) return "아기사자 지원서";
        if (path.startsWith("/admin/recruit/result/manager")) return "운영진 지원서";
        if (path.startsWith("/admin/recruit/user")) return "아기사자 모집";
        if (path.startsWith("/admin/recruit/manager")) return "운영진 모집";
        if (path.startsWith("/admin/recruit")) return "모집 관리";
        if (path.startsWith("/admin/apply-manager")) return "운영진 질문";
        if (path.startsWith("/admin/apply-user")) return "아기사자 질문";
        return "";
    };

    const showSaveButtons =
        path.startsWith("/admin/apply-user") || path.startsWith("/admin/apply-manager");

    const showDownloadButtons =
        path.startsWith("/admin/recruit/user") || path.startsWith("/admin/recruit/manager");

    const applyResultRoute =
        path.startsWith("/admin/recruit/result/user") ||
        path.startsWith("/admin/recruit/result/manager");

    return (
        <div
            className={`${showSaveButtons || applyResultRoute ? "px-0" : "px-10"} flex h-19 items-center justify-between bg-white`}
        >
            <div className="h-full flex flex-row">
                {showSaveButtons ||
                    (applyResultRoute && (
                        <>
                            <div
                                className="flex items-center mx-[26px] cursor-pointer"
                                onClick={() => {
                                    navigate("/admin/recruit");
                                }}
                            >
                                <BackBtn />
                            </div>
                            <div className="h-full w-[1px] bg-[#D9D9D9] mr-6"></div>
                        </>
                    ))}

                <div
                    className={`flex ${showSaveButtons || applyResultRoute ? "text-[20px]" : "text-2xl"} font-bold items-center`}
                >
                    {getHeaderText()}
                </div>
            </div>
            {showSaveButtons && (
                <div className="flex flex-row text-sm font-medium">
                    <button
                        className="w-[111px] h-11 text-white rounded-sm bg-[#ff7700] mr-[40px]"
                        onClick={onSubmit}
                    >
                        지원하기
                    </button>
                </div>
            )}
            {showDownloadButtons && (
                <div className="flex flex-row text-sm font-medium">
                    <button className="w-[114px] h-11 text-white rounded-sm bg-[#ff7700]">
                        합격관리
                    </button>
                </div>
            )}
        </div>
    );
};
