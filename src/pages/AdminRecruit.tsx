import { ROUTES } from "@/constants/routes";
import AdminLayout from "@/layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecruitmentByType } from "@/apis/recruit";

export const AdminRecruitPage = () => {
    const navigate = useNavigate();

    const { data: memberRecruitment } = useQuery({
        queryKey: ["recruitment", "MEMBER"],
        queryFn: () => getRecruitmentByType("MEMBER")
    });

    const { data: managerRecruitment } = useQuery({
        queryKey: ["recruitment", "MANAGER"],
        queryFn: () => getRecruitmentByType("MANAGER")
    });

    const formatDate = (isoString?: string, type: "full" | "monthDay" = "full") => {
        if (!isoString) return "";
        const date = new Date(isoString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");

        return type === "full" ? `${yyyy}-${mm}-${dd}` : `${mm}/${dd}`;
    };

    const formatDateRange = (start?: string, end?: string) => {
        if (!start || !end) return "기간 정보 없음";
        return `서류 접수 : ${formatDate(start, "full")} ~ ${formatDate(end, "monthDay")}`;
    };

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
                    <div className="text-sm text-[#7F7F7F]">
                        {formatDateRange(
                            memberRecruitment?.data.openDate,
                            memberRecruitment?.data.closeDate
                        )}
                    </div>
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
                    <div className="text-sm text-[#7F7F7F]">
                        {formatDateRange(
                            managerRecruitment?.data.openDate,
                            managerRecruitment?.data.closeDate
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
