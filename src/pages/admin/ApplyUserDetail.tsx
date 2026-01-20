import AdminLayout from "@/layouts/AdminLayout";
import Chevright from "@/assets/admin/chevrignt.svg?react";
import { ManagerApplyResult } from "@/components/admin/apply/ManagerApplyResult";
export const AdminUsererRecruitDetailPage = () => {
    return (
        <AdminLayout>
            <div className="flex flex-row items-center pt-12 pb-9 text-sm gap-1 text-[#7F7F7F] ">
                <span>모집관리</span>
                <Chevright />
                <span>디자인</span>
                <Chevright />
                <span>박진아</span>
            </div>
            <ManagerApplyResult />
        </AdminLayout>
    );
};
