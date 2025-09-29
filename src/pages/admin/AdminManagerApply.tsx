import AdminLayout from "@/layouts/AdminLayout";
import { ManagerApplyForm } from "@/components/admin/apply/ApplyForm";
import { ApplyDateForm } from "@/components/admin/apply/ApplyDateForm";
import { useQuestionListsStore } from "@/stores/useQuestionListStore";

export const AdminManagerApplyPage = () => {
    const getAllManagerQuestions = useQuestionListsStore((s) => s.getAllManagerQuestions);

    const handleSubmit = () => {
        const allQuestions = getAllManagerQuestions();
        console.log("모든 질문 리스트:", allQuestions);
    };
    return (
        <AdminLayout onSubmit={handleSubmit}>
            <ApplyDateForm />
            <ManagerApplyForm />
        </AdminLayout>
    );
};
