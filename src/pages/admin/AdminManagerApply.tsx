import AdminLayout from "@/layouts/AdminLayout";
import { ManagerApplyForm } from "@/components/admin/apply/ApplyForm";
import { ApplyDateForm } from "@/components/admin/apply/ApplyDateForm";
import { useQuestionListsStore } from "@/stores/useQuestionListStore";
import { useNavigate } from "react-router-dom";
import { ADMIN_ABS } from "@/routes/routes";
import { useQuery } from "@tanstack/react-query";
import { getRecruitmentByType, updateRecruitmentQuestions } from "@/apis/admin/recruitment";
import type { QuestionRequest } from "@/types/recruitment";
import { mapServerToApiQuestionTarget } from "@/utils/questionTargetMapper";

export const AdminManagerApplyPage = () => {
    const navigate = useNavigate();

    const getAllManagerQuestions = useQuestionListsStore((s) => s.getAllManagerQuestions);

    const recruitmentType = "MANAGER";

    const buildQuestionPayload = (questions: QuestionRequest[]) =>
        questions.map((q, index) => {
            const base = {
                id: q.id ?? null,
                text: q.text,
                questionTarget: mapServerToApiQuestionTarget(q.questionTarget),
                questionType: q.questionType,
                order: index + 1
            };

            return {
                ...base,

                ...(q.questionTarget === "PART" && q.part ? { part: q.part } : {}),

                ...(q.questionTarget === "DEPARTMENT" && q.departmentType
                    ? { departmentType: q.departmentType }
                    : {}),

                ...(q.questionType === "RADIO_BUTTON" && q.buttonList?.length
                    ? { buttonList: q.buttonList }
                    : {})
            };
        });

    const { data: latestRecruitment } = useQuery({
        queryKey: ["recruitment", recruitmentType],
        queryFn: () => getRecruitmentByType(recruitmentType)
    });

    const handleSubmit = async () => {
        if (!latestRecruitment?.data?.id) return;

        const questions = getAllManagerQuestions();
        const payload = buildQuestionPayload(questions);

        try {
            await updateRecruitmentQuestions(latestRecruitment.data.id, payload);
            alert("모집 질문이 저장되었습니다.");
        } catch (e) {
            console.error(e);
            alert("모집 질문 저장 실패");
        }
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
