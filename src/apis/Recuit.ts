import type {
    MyApplicationsResponse,
    QuestionResponse,
    RecruitmentResponse
} from "@/types/Recruit";
import axiosInstance from "./axiosInstance";

export const fetchMyApplications = async (): Promise<MyApplicationsResponse[]> => {
    const res = await axiosInstance.get("/applications/me");
    console.log(res);
    return res.data;
};

export const fetchRecruitments = async (
    recruitmentType: "MEMBER" | "MANAGER"
): Promise<RecruitmentResponse[]> => {
    const { data } = await axiosInstance.get<RecruitmentResponse[]>("/recruitments", {
        params: { recruitmentType }
    });
    return data;
};

export const typeMap = {
    아기사자: "MEMBER",
    운영진: "MANAGER"
} as const;

//모집 질문 get
export interface GetQuestionsParameter {
    part: string;
    department?: string;
}
export const fetchQuestions = async (
    recId: number,
    params: GetQuestionsParameter
): Promise<QuestionResponse[]> => {
    const { data } = await axiosInstance.get<QuestionResponse[]>(
        `/admin/recruitments/${recId}/questions`,
        {
            params
        }
    );
    return data;
};
