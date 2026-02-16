import type { QNAItem } from "./apply";

export interface ManagerData {
    id: number;
    username: string;
    email: string;
    departmentType: string;
    part: string;
    submittedAt: string;
    status: "최종 합격" | "불합격" | "제출" | "서류합격";
}

export interface ApplicationData {
    id: number;
    username: string;
    email: string;
    part: string;
    submittedAt: string;
    status: "최종 합격" | "불합격" | "제출" | "서류 합격";
    departmentType?: string;
    displayStatus?: ApplicationStatus | "제출" | "서류 합격" | "최종 합격" | "불합격";
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
    part: string; // enum이면 타입 따로 지정
    departmentType: string; // enum이면 타입 따로 지정
    status: string; // enum이면 타입 따로 지정
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

// 모집 폼
export interface QuestionResponse {
    id: number;
    text: string;
    questionTarget: string;
    questionType: string;
    part?: string;
    departmentType?: string;
    orderNum: number;
    buttonList?: string[];
}

export interface Recruitment {
    id: number;
    title: string;
    content: string;
    recruitmentType: "MEMBER" | "MANAGER";
    startDate: string;
    endDate: string;
}
export interface LatestRecruitment {
    id: number;
    generation: number;
    recruitmentType: "MEMBER" | "MANAGER";
    openDate: string;
    closeDate: string;
}

export interface RecruitmentRequest {
    generation: number;
    recruitmentType: string;
    openDate: string;
    closeDate: string;
}

export interface QuestionRequest {
    id?: number | null;
    text: string;
    questionTarget: string;
    questionType: string;
    order: number;
    part?: string | null;
    departmentType?: string | null;
    buttonList?: string[];
}

export interface SubscribeRequest {
    email: string;
    type: "MEMBER" | "MANAGER";
}

// 지원서 세부페이지
export interface ApplicationDetail {
    id: number;
    answers: QNAItem[];
    departmentType: string;
    isPersonalInfoConsent?: boolean;
    part: string;
    portfolio?: string;
    submittedAt: string;
    status: ApplicationStatus;
}

export type ApplicationStatus = "SUBMITTED" | "PAPER_PASS" | "FINAL_PASS" | "FAILED";
