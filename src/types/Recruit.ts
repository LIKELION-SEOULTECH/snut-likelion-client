export interface ApplicationAnswer {
    questionId: number;
    questionText: string;
    order: number;
    answer: string;
}

//마이페이지 :  남기기
export interface MyApplicationsResponse {
    id: number;
    username: string;
    major: string;
    phoneNumber: string;
    inSchool: boolean;
    studentId: string;
    grade: number;
    isPersonalInfoConsent: boolean;
    portfolioName: string;
    part: string;
    departmentType: string;
    status: string;
    answers: ApplicationAnswer[];
    submittedAt: string;
}

//지원서
export type RecruitmentType = "아기사자" | "운영진";
//모집기간
export interface RecruitmentResponse {
    id: number;
    generation: number;
    recruitmentType: "아기사자" | "운영진"; //?"아기사자" | "운영진";
    openDate: string;
    closeDate: string;
}

export const typeMap = {
    아기사자: "MEMBER",
    운영진: "MANAGER"
} as const;

// 모집 폼
export interface QuestionResponse {
    id: number;
    text: string;
    questionTarget: string;
    questionType: string;
    part?: string;
    departmentType?: string;
    orderNum: number;
}
