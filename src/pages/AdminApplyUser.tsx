import AdminLayout from "@/layouts/AdminLayout";
import { UserApplyForm } from "@/components/admin/apply/ApplyForm";

export const AdminApplyUserPage = () => {
    return (
        <AdminLayout>
            <div className="mt-12 mb-7">서류 접수 : 2025/3/5 ~3/7</div>
            <UserApplyForm />
        </AdminLayout>
    );
};
