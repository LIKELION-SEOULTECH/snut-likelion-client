import type { QuestionResponse } from "./recruitment";

// 모집 질문
export interface GetQuestionsParameter {
    part: string;
    department?: string;
}

export interface QuestionListResponse {
    code: string;
    message: string;
    data: QuestionResponse[];
}
