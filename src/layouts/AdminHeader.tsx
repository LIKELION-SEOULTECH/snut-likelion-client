import { useRecruitManageStore } from "@/stores/useRecruitManageStore";
import { useLocation, useNavigate } from "react-router-dom";
import BackBtn from "@/assets/admin/back-btn.svg?react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
    isFormValid?: boolean;
    onToggleDeleteMode?: () => void;
    isDeleteMode?: boolean;
    onSubmit?: () => void;
    onDelete?: () => void;
    onClickBackBtn?: () => void;
}

export const AdminHeader = ({
    isFormValid,
    onToggleDeleteMode,
    isDeleteMode,
    onSubmit,
    onDelete,
    onClickBackBtn
}: AdminHeaderProps) => {
    const { isManageMode, toggleManageMode } = useRecruitManageStore();

    const navigate = useNavigate();

    const location = useLocation();
    const path = location.pathname;

    const getHeaderText = () => {
        if (path.startsWith("/admin/member")) return "멤버 관리";
        if (path.startsWith("/admin/notice")) {
            if (path === "/admin/notice/create") return "소식 등록";
            if (path.includes("/edit")) return "소식 수정";
            if (/\d+$/.test(path) || path.includes("/detail")) return "소식 상세";
            if (isDeleteMode) return "소식 삭제";
            return "소식 관리";
        }
        if (path.startsWith("/admin/blog/create")) return "블로그 등록하기";
        if (path.startsWith("/admin/blog/edit")) return "블로그 수정하기";
        if (path.startsWith("/admin/blog")) return isDeleteMode ? "블로그 삭제" : "블로그 관리";

        if (path.startsWith("/admin/project")) {
            if (path.startsWith("/admin/project/create")) return "프로젝트 업로드";
            if (path.includes("/edit")) return "프로젝트 수정";
            return "프로젝트 관리";
        }
        if (path.startsWith("/admin/notice")) return "소식 관리";
        if (path.startsWith("/admin/blog")) {
            if (path === "/admin/blog/create") return "블로그 등록하기";
            if (path.includes("/edit")) return "블로그 수정하기";
            return "블로그 관리";
        }
        if (path.startsWith("/admin/project")) return "프로젝트 관리";
        if (path.startsWith("/admin/recruit/result/user")) return "아기사자 지원서";
        if (path.startsWith("/admin/recruit/result/manager")) return "운영진 지원서";
        if (path.startsWith("/admin/recruit/user") && isManageMode) return "아기사자 합격 관리";
        if (path.startsWith("/admin/recruit/user")) return "아기사자 모집";
        if (path.startsWith("/admin/recruit/manager") && isManageMode) return "운영진 합격 관리";
        if (path.startsWith("/admin/recruit/manager")) return "운영진 모집";
        if (path.startsWith("/admin/recruit/apply-manager")) return "운영진 질문";
        if (path.startsWith("/admin/recruit/apply-user")) return "아기사자 질문";
        if (path.startsWith("/admin/recruit")) return "모집 관리";

        return "";
    };

    const showButtons =
        path.startsWith("/admin/notice") ||
        path.startsWith("/admin/blog") ||
        path.startsWith("/admin/project") ||
        path.startsWith("/admin/recruit");

    // 뒤로가기 버튼 있는 경우
    const showBackButton =
        path.startsWith("/admin/blog/create") ||
        path.startsWith("/admin/blog/edit") ||
        path.startsWith("/admin/notice/create") ||
        path.startsWith("/admin/notice/edit") ||
        /^\/admin\/notice\/\d+$/.test(path) ||
        path.startsWith("/admin/project/create") ||
        path.startsWith("/admin/project/edit") ||
        path.startsWith("/admin/recruit/apply-user") ||
        path.startsWith("/admin/recruit/apply-manager") ||
        (path.startsWith("/admin/recruit/manager") && isManageMode) ||
        (path.startsWith("/admin/recruit/user") && isManageMode);

    const renderButtons = () => {
        // 소식 업로드 버튼
        if (path === "/admin/notice/create") {
            return (
                <Button
                    className="w-[161px] h-11 text-gray-0 rounded-sm bg-primary-500 disabled:bg-gray-100 hover:bg-primary-300"
                    disabled={!isFormValid}
                    onClick={onSubmit}
                >
                    업로드
                </Button>
            );
        }

        // 운영진 질문 저장하기 버튼
        if (path === "/admin/recruit/apply-manager") {
            return (
                <button
                    className="w-[111px] h-11 text-gray-0 rounded-sm bg-primary-500"
                    onClick={onSubmit}
                >
                    저장하기
                </button>
            );
        }
        // 멤버 질문 저장하기 버튼
        if (path === "/admin/recruit/apply-user") {
            return (
                <button
                    className="w-[111px] h-11 text-gray-0 rounded-sm bg-primary-500"
                    onClick={onSubmit}
                >
                    저장하기
                </button>
            );
        }
        // 운영진 모집 합격자 관리 버튼
        if (path === "/admin/recruit/manager" && isManageMode) {
            return (
                <button
                    className="w-[87px] h-11 text-gray-0 rounded-sm bg-primary-500"
                    onClick={toggleManageMode}
                >
                    저장
                </button>
            );
        }
        // 아기사자 모집 합격자 관리 버튼
        if (path === "/admin/recruit/user" && isManageMode) {
            return (
                <button
                    className="w-[87px] h-11 text-gray-0 rounded-sm bg-primary-500"
                    onClick={toggleManageMode}
                >
                    저장
                </button>
            );
        }
        // 운영진 모집 합격자 관리 버튼
        if (path === "/admin/recruit/manager") {
            return (
                <button
                    className="w-[114px] h-11 text-gray-0 rounded-sm bg-primary-500"
                    onClick={toggleManageMode}
                >
                    합격 관리
                </button>
            );
        }
        // 아기사자 모집 합격자 관리 버튼
        if (path === "/admin/recruit/user") {
            return (
                <button
                    className="w-[114px] h-11 text-gray-0 rounded-sm bg-primary-500"
                    onClick={toggleManageMode}
                >
                    합격 관리
                </button>
            );
        }

        // 어드민 프로젝트 업로드 버튼
        if (path === "/admin/project/create") {
            return (
                <Button
                    className="w-[161px] h-11 text-gray-0 rounded-sm bg-primary-500 disabled:bg-gray-100 hover:bg-primary-300"
                    disabled={!isFormValid}
                    onClick={onSubmit}
                >
                    업로드
                </Button>
            );
        }

        if (path.includes("/notice/edit")) {
            return (
                <>
                    <Button
                        className="w-[161px] h-11 text-icon rounded-sm bg-white border border-primary-500 hover:bg-gray-25"
                        onClick={onDelete}
                    >
                        삭제
                    </Button>
                    <Button
                        className="w-[161px] h-11 text-gray-0 rounded-sm bg-primary-500 disabled:bg-gray-100 hover:bg-primary-300"
                        disabled={!isFormValid}
                        onClick={onSubmit}
                    >
                        수정하기
                    </Button>
                </>
            );
        }

        if (path === "/admin/blog/create") {
            return (
                <Button
                    className="w-[161px] h-11 text-gray-0 rounded-sm bg-primary-500 disabled:bg-gray-100 hover:bg-primary-300"
                    disabled={!isFormValid}
                    onClick={onSubmit}
                >
                    등록하기
                </Button>
            );
        }

        if (path.includes("/project/edit")) {
            return (
                <>
                    <Button
                        className="w-[161px] h-11 text-icon rounded-sm bg-white border border-primary-500 hover:bg-gray-25"
                        onClick={onDelete}
                    >
                        삭제
                    </Button>
                    <Button
                        className="w-[161px] h-11 text-gray-0 rounded-sm bg-primary-500 disabled:bg-gray-100 hover:bg-primary-300"
                        disabled={!isFormValid}
                        onClick={onSubmit}
                    >
                        수정
                    </Button>
                </>
            );
        }

        if (path.includes("/edit")) {
            return (
                <Button
                    className="w-[161px] h-11 text-gray-0 rounded-sm bg-primary-500 disabled:bg-gray-100 hover:bg-primary-300"
                    disabled={!isFormValid}
                    onClick={onSubmit}
                >
                    수정하기
                </Button>
            );
        }

        // 소식 상세 페이지 버튼
        if (/\d+$/.test(path) || path.includes("/detail")) {
            return (
                <>
                    <Button
                        className="w-[161px] h-11 text-icon rounded-sm bg-white border border-primary-500 hover:bg-gray-25"
                        onClick={onDelete}
                    >
                        삭제
                    </Button>
                    <Button
                        className="w-[161px] h-11 text-gray-0 rounded-sm bg-primary-500 disabled:bg-gray-100 hover:bg-primary-300"
                        onClick={onSubmit}
                    >
                        수정
                    </Button>
                </>
            );
        }

        if (
            path.startsWith("/admin/notice") ||
            path.startsWith("/admin/blog") ||
            path.startsWith("/admin/project")
        ) {
            return isDeleteMode ? (
                <Button
                    className="w-[161px] h-11 text-gray-0 rounded-sm bg-primary-500 disabled:bg-gray-100 hover:bg-primary-300"
                    onClick={onToggleDeleteMode}
                >
                    삭제
                </Button>
            ) : (
                <>
                    <Button
                        className="w-[161px] h-11 text-icon rounded-sm bg-white border border-primary-500 hover:bg-gray-25"
                        onClick={onToggleDeleteMode}
                    >
                        삭제
                    </Button>

                    <Button
                        className="w-[161px] h-11 text-gray-0 rounded-sm bg-primary-500 disabled:bg-gray-100 hover:bg-primary-300"
                        onClick={() => navigate("create")}
                    >
                        업로드
                    </Button>
                </>
            );
        }

        return null;
    };

    return (
        <div>
            {showBackButton ? (
                <div className="flex flex-row h-19 bg-gray-0">
                    <div
                        className="w-19 h-full flex items-center justify-center border-r border-[#d9d9d9] cursor-pointer"
                        onClick={onClickBackBtn}
                    >
                        <BackBtn />
                    </div>
                    <div className="w-full flex h-full items-center px-6  justify-between">
                        <div className="bold-20">{getHeaderText()}</div>
                        {showButtons && (
                            <div className="flex flex-row medium-14 gap-[9px] mr-4">
                                {renderButtons()}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex h-19 items-center px-10 bg-gray-0 justify-between">
                    <div className="bold-20">{getHeaderText()}</div>
                    {showButtons && (
                        <div className="flex flex-row medium-14 gap-[9px]">{renderButtons()}</div>
                    )}
                </div>
            )}
        </div>
    );
};
