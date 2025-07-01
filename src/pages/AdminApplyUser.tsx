import AdminLayout from "@/layouts/AdminLayout";
import { UserApplyForm } from "@/components/admin/apply/ApplyForm";
import { ApplyDateForm } from "@/components/admin/apply/ApplyDateForm";
export const AdminApplyUserPage = () => {
    return (
        <AdminLayout>
            <ApplyDateForm />
            <UserApplyForm />
        </AdminLayout>
    );
};
