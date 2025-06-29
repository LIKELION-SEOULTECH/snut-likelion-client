import { ROUTES } from "@/constants/routes";
import AdminLayout from "@/layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

export const AdminRecruitPage = () => {
    const navigate = useNavigate();

    return (
        <AdminLayout>
            <div className="flex flex-col gap-10 mt-12">
                <div className="flex flex-col p-10 gap-10 bg-white rounded-sm">
                    <div className="flex h-11 justify-between items-center">
                        <div className="font-semibold text-xl">아기사자 지원서 관리</div>
                        <button
                            className="h-full px-[31px] bg-[#404040] text-white text-sm font-medium rounded-sm"
                            onClick={() => {
                                navigate(ROUTES.ADMIN_APPLY_USER);
                            }}
                        >
                            작성하기
                        </button>
                    </div>
                    <div className="text-sm text-[#7F7F7F]">서류 접수 : 2025/3/5 ~3/7</div>
                </div>
                <div className="flex flex-col p-10 gap-10 bg-white rounded-sm">
                    <div className="flex h-11 justify-between items-center">
                        <div className="font-semibold text-xl">운영진 지원서 관리</div>
                        <button
                            className="h-full px-[31px] bg-[#404040] text-white text-sm font-medium rounded-sm"
                            onClick={() => {
                                navigate(ROUTES.ADMIN_APPLY_MANAGER);
                            }}
                        >
                            작성하기
                        </button>
                    </div>
                    <div className="text-sm text-[#7F7F7F]">서류 접수 : 2025/3/5 ~3/7</div>
                </div>
            </div>
        </AdminLayout>
    );
};
