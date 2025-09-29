import AdminLayout from "@/layouts/AdminLayout";
import { UserApplyForm } from "@/components/admin/apply/ApplyForm";
import { ApplyDateForm } from "@/components/admin/apply/ApplyDateForm";
import { useQuestionListsStore } from "@/stores/useQuestionListStore";

export const AdminUserApplyPage = () => {
    const getAllUserQuestions = useQuestionListsStore((s) => s.getAllUserQuestions);

    const handleSubmit = () => {
        const allQuestions = getAllUserQuestions();
        console.log("모든 질문 리스트:", allQuestions);
    };
    return (
        <AdminLayout onSubmit={handleSubmit}>
            <ApplyDateForm />
            <UserApplyForm />
        </AdminLayout>
    );
};
