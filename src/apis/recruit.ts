import axiosInstance from "./axiosInstace";

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
    text: string | null;
    questionType: "SHORT" | "LONG" | "RADIO_BUTTON" | null;
    part: "PLANNING" | "DESIGN" | "FRONTEND" | "BACKEND" | "AI" | null;
    departmentType: "OPERATION" | "ACADEMIC" | "MARKETING" | null;
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

export const updateRecruitmentQuestions = (recId: number, data: UpdateQuestionRequest[]) => {
    return axiosInstance.put(`/admin/recruitments/${recId}/questions`, data);
};

export const getApplicationsByRecruitment = (recId: number) => {
    return axiosInstance.get(`/admin/recruitments/${recId}/applications`);
};

export const getApplicationDetail = (appId: number) => {
    return axiosInstance.get(`/admin/applications/${appId}`);
};

export const getRecruitmentByType = (type: "MEMBER" | "MANAGER") => {
    return axiosInstance.get(`/recruitments?recruitmentType=${type}`).then((res) => res.data);
};
