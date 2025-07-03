import type {
    MyApplicationsResponse,
    QuestionResponse,
    RecruitmentResponse
} from "@/types/Recruits";
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

//모집 질문
export interface GetQuestionsParameter {
    part: string;
    department?: string;
}
export interface QuestionListResponse {
    code: string;
    message: string;
    data: QuestionResponse[];
}
export const fetchQuestions = async (
    recId: number,
    params: GetQuestionsParameter
): Promise<QuestionResponse[]> => {
    const res = await axiosInstance.get<QuestionListResponse>(`/recruitments/${recId}/questions`, {
        params
    });
    return res.data.data;
};
