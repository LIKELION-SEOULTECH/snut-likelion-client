import { logout } from "@/apis/main/auth";
import { deleteMyAccount } from "@/apis/main/member";
import { ROUTES } from "@/routes/routes";
import { useAuthStore } from "@/stores/useAuthStore";
import type { LionInfoDetailsResponse, MemberDetailResponse } from "@/types/member";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MyPageTabProps {
    isGuest?: boolean;
    member?: MemberDetailResponse;
    lionInfo?: LionInfoDetailsResponse;
    selectedGeneration?: number | null;
}

export const MyPageTab = ({
    isGuest = false,
    member,
    lionInfo,
    selectedGeneration
}: MyPageTabProps) => {
    const [activeTab, setActiveTab] = useState<string | null>(isGuest ? "계정설정" : null);
    const [isAccountOpen, setIsAccountOpen] = useState(isGuest);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn: logout,

        onSuccess: () => {
            useAuthStore.getState().clearAuth();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            queryClient.clear();

            navigate(ROUTES.HOME, { replace: true });
        },

        onError: (error) => {
            console.error("로그아웃 실패", error);
            alert("로그아웃에 실패했습니다.");
        }
    });

    const toggleTab = (tab: string) => {
        if (tab === "계정설정") {
            setIsAccountOpen((prev) => !prev);
        } else {
            setIsAccountOpen(isGuest);
        }

        setActiveTab(tab);
        if (tab === "프로필 수정") {
            navigate("/mypage-edit", {
                state: {
                    member,
                    lionInfo,
                    selectedGeneration
                }
            });
        }
        if (tab === "비밀번호 변경") navigate(ROUTES.PASSWORD_RESET);
    };

    const isActive = (tab: string) => activeTab === tab;

    const isAnyAccountTabActive = ["계정설정", "비밀번호 변경", "로그아웃", "회원탈퇴"].includes(
        activeTab ?? ""
    );

    const baseBtnClass = "w-full py-3 px-4 rounded text-left rounded-[8px] cursor-pointer";

    const handleDeleteMember = async () => {
        if (!member) return;

        const confirmDelete = confirm(
            "정말 회원탈퇴 하시겠습니까? 탈퇴 시 모든 정보가 삭제됩니다."
        );
        if (!confirmDelete) return;

        try {
            await deleteMyAccount(member.id);
            alert("회원탈퇴가 완료되었습니다.");
            navigate(ROUTES.LOGIN);
        } catch (error) {
            console.error("회원탈퇴 실패", error);
            alert("회원탈퇴 중 오류가 발생했습니다.");
        }
    };

    return (
        <div
            style={{
                border: "1px solid #3A3A3A",
                background: `#232323`,
                borderRadius: "12px",
                padding: "33px",
                color: "#FFF",
                fontSize: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
            }}
        >
            {/* 프로필 수정 버튼 */}
            {!isGuest && (
                <button
                    onClick={() => toggleTab("프로필 수정")}
                    className={`${baseBtnClass} ${isActive("프로필 수정") ? "bg-[#3A3A3A]" : ""} hover:bg-black`}
                >
                    프로필 수정
                </button>
            )}

            {/* 계정설정 탭 */}
            <button
                onClick={() => toggleTab("계정설정")}
                className={`${baseBtnClass} ${isAnyAccountTabActive ? "bg-[#3A3A3A]" : ""} hover:bg-black`}
            >
                {isGuest ? "지원서" : "계정설정"}
            </button>
            {/* 아래버튼 */}
            {(isGuest || isAccountOpen) && (
                <>
                    <button
                        onClick={() => toggleTab("비밀번호 변경")}
                        className={`${baseBtnClass} hover:bg-black`}
                    >
                        비밀번호 변경
                    </button>
                    <button
                        className={`${baseBtnClass} hover:bg-black`}
                        onClick={() => {
                            logoutMutation.mutate();
                        }}
                    >
                        로그아웃
                    </button>
                    <button
                        onClick={handleDeleteMember}
                        className={`${baseBtnClass} hover:bg-black`}
                    >
                        회원탈퇴
                    </button>
                </>
            )}
        </div>
    );
};
