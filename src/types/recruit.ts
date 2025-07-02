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
