import AdminLayout from "@/layouts/AdminLayout";
import Chevright from "@/assets/admin/chevrignt.svg?react";
import { ManagerApplyResult } from "@/components/admin/apply/ManagerApplyResult";
import { useQuery } from "@tanstack/react-query";
import { getAdminApplicationDetail } from "@/apis/admin/recruitment";
import { useParams } from "react-router-dom";
import { getDepartmentLabel, getPartLabel } from "@/utils/enumLabel";
export const AdminManagerRecruitDetailPage = () => {
    const { id } = useParams();

    const appId = Number(id);

    const { data: ApplicationDetailRes } = useQuery({
        queryKey: ["adminApplicationDetail", appId],
        queryFn: () => getAdminApplicationDetail(appId),
        enabled: !!appId
    });

    console.log(ApplicationDetailRes);
    return (
        <AdminLayout>
            <div className="flex flex-row items-center pt-12 pb-9 text-sm gap-1 text-[#7F7F7F] ">
                <span>모집관리</span>
                <Chevright />
                <span>{getPartLabel(ApplicationDetailRes?.part)}</span>
                <Chevright />
                <span>{getDepartmentLabel(ApplicationDetailRes?.departmentType)}</span>
                <Chevright />
                <span>{ApplicationDetailRes?.username}</span>
            </div>
            {ApplicationDetailRes && (
                <ManagerApplyResult applicationDetail={ApplicationDetailRes} />
            )}
        </AdminLayout>
    );
};
