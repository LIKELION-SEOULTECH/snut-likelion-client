import axiosInstance from "./axiosInstace";
import type { Question } from "./apply";
export interface Recruitment {
    id: number;
    title: string;
    content: string;
    recruitmentType: "MEMBER" | "MANAGER";
    startDate: string;
    endDate: string;
}

export interface CreateRecruitmentRequest {
    generation: number;
    recruitmentType: string;
    openDate: string;
    closeDate: string;
}

export interface UpdateRecruitmentRequest {
    generation: number;
    recruitmentType: "MEMBER" | "MANGER";
    openDate: string;
    closeDate: string;
}

export interface UpdateQuestionRequest {
    id?: number;
    text: string;
    questionType: string;
    questionTarget: string;
    order: number;
    part?: string;
    departmentType?: string;
    buttonList?: string[];
}

// 최신 모집일정 조회
export const fetchRecentRecruitment = async (recruitmentType: string) => {
    const res = await axiosInstance.get("/recruitments", {
        params: { recruitmentType }
    });
    return res.data;
};

export const createRecruitment = (data: CreateRecruitmentRequest) => {
    return axiosInstance.post("/admin/recruitments", data);
};

export const updateRecruitment = (id: number, data: CreateRecruitmentRequest) => {
    return axiosInstance.patch(`/admin/recruitments/${id}`, data);
};

export const deleteRecruitment = (recId: number) => {
    return axiosInstance.delete(`/admin/recruitments/${recId}`);
};

export const getRecruitmentQuestions = (recId: number) => {
    return axiosInstance.get(`/admin/recruitments/${recId}/questions`);
};

// 지원서 질문 업데이터
export const updateQuestions = async (recId: number, questions: UpdateQuestionRequest[]) => {
    const response = await axiosInstance.put(
        `/api/v1/admin/recruitments/${recId}/questions`,
        questions
    );
    return response.data;
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
    const res = await axiosInstance.get(`/api/v1/admin/recruitments/${recruitmentId}/questions`);
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
    return res.data;
};

// 특정 모집에 대한 질문 조회
export const fetchQuestionsByRecruitment = async (recId: number | string) => {
    const res = await axiosInstance.get(`/admin/recruitments/${recId}/questions`);
    return res.data;
};

import axiosInstance from "./axiosInstance";

interface SubscribeRequest {
    email: string;
    type: string;
}

export const subscribeRecruitment = ({ email, type }: SubscribeRequest) => {
    const params = new URLSearchParams({ email, type: type }).toString();
    return axiosInstance.post(`/subscriptions?${params}`);
};

// 최신 모집 일정 조회
export const fetchRecentRecruitment = async (type: string) => {
    const response = await axiosInstance.get("/recruitments", {
        params: { recruitmentType: type }
    });
    return response.data;
};
