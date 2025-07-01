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

export const updateQuestionsByRecruitment = async (
    recId: number,
    payload: UpdateQuestionRequest[]
) => {
    return axiosInstance.put(`/api/v1/admin/recruitments/${recId}/questions`, payload);
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
