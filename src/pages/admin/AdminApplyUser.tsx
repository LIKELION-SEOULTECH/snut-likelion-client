import { useRef } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { UserApplyForm } from "@/components/admin/apply/ApplyForm";
import { ApplyDateForm } from "@/components/admin/apply/ApplyDateForm";
export const AdminApplyUserPage = () => {
    const saveFnsRef = useRef<(() => void)[]>([]);

    const handleSubmitAll = () => {
        saveFnsRef.current.forEach((fn) => fn());
    };

    return (
        <AdminLayout onSubmit={handleSubmitAll}>
            <ApplyDateForm />
            <UserApplyForm
                onSave={(fns) => {
                    saveFnsRef.current = fns;
                }}
            />
        </AdminLayout>
    );
};
