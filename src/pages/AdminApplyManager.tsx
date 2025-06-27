import AdminLayout from "@/layouts/AdminLayout";
import { ManagerApplyForm } from "@/components/admin/apply/ApplyForm";

export const AdminApplyManagerPage = () => {
    return (
        <AdminLayout>
            <div className="mt-12 mb-7 text-[#7F7F7F] text-sm">서류 접수 : 2025/3/5 ~3/7</div>
            <ManagerApplyForm />
        </AdminLayout>
    );
};
