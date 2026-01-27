import type { QuestionRequest, RecruitmentRequest } from "@/types/recruitment";
import axiosInstance from "../axiosInstance";
import type { Question } from "@/types/apply";

// 특정 모집 일정의 모든 질문들 조회

// 특정 모집 일정에 질문 업데이트

// 특정 모집에 대한 모든 제출된 지원서 목록 조회

export const createRecruitment = (data: RecruitmentRequest) => {
    return axiosInstance.post("/admin/recruitments", data);
};

export const updateRecruitment = (id: number, data: RecruitmentRequest) => {
    return axiosInstance.patch(`/admin/recruitments/${id}`, data);
};

export const deleteRecruitment = (recId: number) => {
    return axiosInstance.delete(`/admin/recruitments/${recId}`);
};

export const getRecruitmentQuestions = (recId: number) => {
    return axiosInstance.get(`/admin/recruitments/${recId}/questions`);
};

export const getApplicationDetail = (appId: number) => {
    return axiosInstance.get(`/admin/applications/${appId}`);
};

export const getRecruitmentByType = async (type: "MEMBER" | "MANAGER") => {
    const res = await axiosInstance.get(`/recruitments?recruitmentType=${type}`);
    console.log(res.data);
    return res.data;
};

export const getApplicationsByRecruitment = async (recruitmentId: number): Promise<Question[]> => {
    const res = await axiosInstance.get(`/admin/recruitments/${recruitmentId}/questions`);
    return res.data;
};

// 특정 모집에 대한 지원서 조회
export const getSubmittedApplications = async ({
    recId,
    page = 0,
    part,
    department,
    status
}: {
    recId: number;
    page?: number;
    part?: string;
    department?: string;
    status?: string;
}) => {
    const res = await axiosInstance.get(`/admin/recruitments/${recId}/applications`, {
        params: { page, part, department, status }
    });
    return res.data.data;
};

// 특정 모집에 대한 질문 조회
export const fetchQuestionsByRecruitment = async (recId: number) => {
    const res = await axiosInstance.get(`/admin/recruitments/${recId}/questions`);
    return res.data;
};

// 특정 모집에 대한 질문 추가 혹은 수정
export const updateRecruitmentQuestions = async (recId: number, questions: QuestionRequest[]) => {
    const res = await axiosInstance.put(`/admin/recruitments/${recId}/questions`, questions);
    return res.data;
};

// 단일 지원서 상세 조회
export const getAdminApplicationDetail = async (appId: number) => {
    const res = await axiosInstance.get(`/admin/applications/${appId}`);
    return res.data;
};

// 지원서 상태 일괄 변경
export const updateApplicationStatus = ({
    status,
    ids
}: {
    status: "PAPER_PASS" | "FINAL_PASS";
    ids: number[];
}) => {
    return axiosInstance.patch("/admin/applications/status", { ids }, { params: { status } });
};
