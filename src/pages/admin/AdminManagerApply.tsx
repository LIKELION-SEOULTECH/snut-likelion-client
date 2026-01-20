import AdminLayout from "@/layouts/AdminLayout";
import { ManagerApplyForm } from "@/components/admin/apply/ApplyForm";
import { ApplyDateForm } from "@/components/admin/apply/ApplyDateForm";
import { useQuestionListsStore } from "@/stores/useQuestionListStore";
import { useNavigate } from "react-router-dom";
import { ADMIN_ABS } from "@/routes/routes";
import { useQuery } from "@tanstack/react-query";
import { getRecruitmentByType } from "@/apis/admin/recruitment";

export const AdminManagerApplyPage = () => {
    const navigate = useNavigate();

    const getAllManagerQuestions = useQuestionListsStore((s) => s.getAllManagerQuestions);

    const recruitmentType = "MANAGER";

    const { data: latestRecruitment } = useQuery({
        queryKey: ["recruitment", recruitmentType],
        queryFn: () => getRecruitmentByType(recruitmentType)
    });

    const handleSubmit = () => {
        const allQuestions = getAllManagerQuestions();
        console.log("모든 질문 리스트:", allQuestions);
    };

    const handleBackBtn = () => {
        navigate(ADMIN_ABS.RECRUIT);
    };

    return (
        <AdminLayout onSubmit={handleSubmit} onClickBackBtn={handleBackBtn}>
            <ApplyDateForm
                latestRecruitment={latestRecruitment?.data}
                recruitmentType={recruitmentType}
            />
            <ManagerApplyForm recId={latestRecruitment?.data.id} />
        </AdminLayout>
    );
};
