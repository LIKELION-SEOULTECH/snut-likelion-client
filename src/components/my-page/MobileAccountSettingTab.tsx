import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Separator } from "../ui/separator";
import { logout } from "@/apis/main/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import type { MemberDetailResponse } from "@/types/member";
import { deleteMyAccount } from "@/apis/main/member";

export const MobileAccontSettingTab = ({ member }: { member?: MemberDetailResponse }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSettled: () => {
            useAuthStore.getState().clearAuth();
            queryClient.clear();

            navigate(ROUTES.HOME, { replace: true });
        },
        onError: () => {
            console.log("서버 로그아웃 실패(토큰 만료 가능). 로컬 로그아웃 처리됨");
        }
    });

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
        <>
            {/* 모바일 계정설정 탭 */}
            <div className="flex sm:hidden w-full px-5 mt-20 mb-66 flex-col gap-4 text-sm font-medium">
                <h4 className="">계정설정</h4>
                <div className="flex flex-col text-gray-100">
                    <span className="py-4" onClick={() => navigate(ROUTES.MYPAGE_PASSWORD_CHANGE)}>
                        비밀번호 변경
                    </span>
                    <Separator className="bg-gray-600" />
                    <span
                        className="py-4"
                        onClick={() => {
                            logoutMutation.mutate();
                        }}
                    >
                        로그아웃
                    </span>
                    <Separator className="bg-gray-600" />
                    <span className="py-4" onClick={handleDeleteMember}>
                        회원탈퇴
                    </span>
                </div>
            </div>
        </>
    );
};
