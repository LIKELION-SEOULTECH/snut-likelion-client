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

export interface ManagerData {
    id: number;
    name: string;
    email: string;
    department: string;
    part: string;
    applyDate: string;
    result: "합격" | "불합격";
}

export interface UserData {
    id: number;
    name: string;
    email: string;
    part: string;
    applyDate: string;
    result: "합격" | "불합격";
}

export interface UpdateQuestionRequest {
    id?: number; // 기존 질문이면 존재
    text: string;
    questionType: string;
    questionTarget: string;
    order: number;
    part?: string; // questionTarget === "PART"일 때만 사용
    departmentType?: string; // questionTarget === "DEPARTMENT"일 때만 사용
    buttonList?: string[]; // questionType === "RADIO_BUTTON"일 때만 사용
}
