import AdminLayout from "@/layouts/AdminLayout";
import { ManagerApplyForm } from "@/components/admin/apply/ApplyForm";
import { ApplyDateForm } from "@/components/admin/apply/ApplyDateForm";

export const AdminApplyManagerPage = () => {
    return (
        <AdminLayout>
            <ApplyDateForm />
            <ManagerApplyForm />
        </AdminLayout>
    );
};
