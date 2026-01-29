import AdminLayout from "@/layouts/AdminLayout";
import { UserApplyForm } from "@/components/admin/apply/ApplyForm";
import { ApplyDateForm } from "@/components/admin/apply/ApplyDateForm";
import { useQuestionListsStore } from "@/stores/useQuestionListStore";
import { useNavigate } from "react-router-dom";
import { ADMIN_ABS } from "@/routes/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecruitmentByType, updateRecruitmentQuestions } from "@/apis/admin/recruitment";
import type { QuestionRequest } from "@/types/recruitment";
import { toast } from "sonner";
import { AlertCircle, CircleCheck } from "lucide-react";
import { QuestionSaveModal } from "@/components/admin/recruit/QuestionSaveModal";
import { useState } from "react";

export const AdminUserApplyPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [saveModal, setSaveModal] = useState(false);

    const getAllUserQuestions = useQuestionListsStore((s) => s.getAllUserQuestions);

    const recruitmentType = "MEMBER";

    const buildQuestionPayload = (questions: QuestionRequest[]) =>
        questions.map((q, index) => {
            const base = {
                id: q.id ?? null,
                text: q.text,
                questionTarget: q.questionTarget,
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

    const updateQuestionsMutation = useMutation({
        mutationFn: (payload: QuestionRequest[]) =>
            updateRecruitmentQuestions(latestRecruitment!.data.id, payload),

        onSuccess: () => {
            setSaveModal(false);
            toast(
                <div className="flex items-center gap-2">
                    <CircleCheck size={20} className="text-green-400" />
                    <span className="text-sm font-medium">질문이 성공적으로 저장되었습니다</span>
                </div>,
                {
                    unstyled: true,
                    duration: 3000,
                    classNames: {
                        toast: "bg-black/60 shadow-[0px_4px_24px_rgba(0,0,0,0.16)] backdrop-blur-none text-white px-[23px] py-[11.5px] rounded-sm"
                    }
                }
            );

            queryClient.invalidateQueries({
                queryKey: ["recruitment", recruitmentType]
            });
        },

        onError: () => {
            setSaveModal(false);
            toast(
                <div className="flex items-center gap-2">
                    <AlertCircle size={20} className="text-red-400" />
                    <span className="text-sm font-medium">질문 저장에 실패했습니다</span>
                </div>,
                {
                    unstyled: true,
                    duration: 3000,
                    classNames: {
                        toast: "bg-black/60 shadow-[0px_4px_24px_rgba(0,0,0,0.16)] backdrop-blur-none text-white px-[23px] py-[11.5px] rounded-sm"
                    }
                }
            );
        }
    });

    const handleSubmit = async () => {
        if (!latestRecruitment?.data?.id) return;

        const questions = getAllUserQuestions();
        const payload = buildQuestionPayload(questions);

        setSaveModal(false);
        updateQuestionsMutation.mutate(payload);
    };

    const handleBackBtn = () => {
        navigate(ADMIN_ABS.RECRUIT);
    };

    return (
        <AdminLayout onSubmit={() => setSaveModal(true)} onClickBackBtn={handleBackBtn}>
            <ApplyDateForm
                latestRecruitment={latestRecruitment?.data}
                recruitmentType={recruitmentType}
            />
            <UserApplyForm recId={latestRecruitment?.data.id} />
            <QuestionSaveModal
                open={saveModal}
                onClose={() => setSaveModal(false)}
                onConfirm={handleSubmit}
            />
        </AdminLayout>
    );
};
