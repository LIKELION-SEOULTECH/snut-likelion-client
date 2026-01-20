import { useQuery } from "@tanstack/react-query";
import { fetchRecentRecruitment, fetchQuestions } from "@/apis/main/recruitment";
import type { GetQuestionsParameter } from "@/types/recruitment-form";

export const useRecruitmentSchedule = (recruitmentType: string) => {
    return useQuery({
        queryKey: ["recruitmentSchedule", recruitmentType],
        queryFn: () => fetchRecentRecruitment(recruitmentType)
    });
};

export const useQuestions = (recId: number, params: GetQuestionsParameter) => {
    return useQuery({
        queryKey: ["questions", recId, params],
        queryFn: () => fetchQuestions(recId, params),
        enabled: !!recId && (!!params.part || !!params.department)
    });
};