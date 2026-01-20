import AdminLayout from "@/layouts/AdminLayout";
import Chevright from "@/assets/admin/chevrignt.svg?react";
import { ManagerApplyResult } from "@/components/admin/apply/ManagerApplyResult";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAdminApplicationDetail } from "@/apis/admin/recruitment";
import { getPartLabel } from "@/utils/enumLabel";

export const AdminUsererRecruitDetailPage = () => {
    const { id } = useParams();

    const appId = Number(id);

    const {
        data: ApplicationDetailRes
        // isLoading,
        // isError
    } = useQuery({
        queryKey: ["adminApplicationDetail", appId],
        queryFn: () => getAdminApplicationDetail(appId),
        enabled: !!appId
    });

    return (
        <AdminLayout>
            <div className="flex flex-row items-center pt-12 pb-9 text-sm gap-1 text-[#7F7F7F] ">
                <span>모집관리</span>
                <Chevright />
                <span>{getPartLabel(ApplicationDetailRes?.data.part)}</span>
                <Chevright />
                <span>{ApplicationDetailRes?.data.username}</span>
            </div>
            <ManagerApplyResult answerList={ApplicationDetailRes?.data.answer} />
        </AdminLayout>
    );
};
