import { useRef } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { ManagerApplyForm } from "@/components/admin/apply/ApplyForm";
import { ApplyDateForm } from "@/components/admin/apply/ApplyDateForm";

export const AdminApplyManagerPage = () => {
    const saveFnsRef = useRef<(() => void)[]>([]);

    const handleSubmitAll = () => {
        saveFnsRef.current.forEach((fn) => fn());
    };

    return (
        <AdminLayout onSubmit={handleSubmitAll}>
            <ApplyDateForm />
            <ManagerApplyForm
                onSave={(fns) => {
                    saveFnsRef.current = fns;
                }}
            />
        </AdminLayout>
    );
};
