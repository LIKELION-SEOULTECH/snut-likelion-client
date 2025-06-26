import AdminLayout from "@/layouts/AdminLayout";
import DraggableQuestionList from "@/components/admin/apply/AdminApplyForm";

export const AdminApplyManagerPage = () => {
    return (
        <AdminLayout>
            <div className="mt-12 mb-7">서류 접수 : 2025/3/5 ~3/7</div>
            <DraggableQuestionList />
        </AdminLayout>
    );
};
