import type { Question } from "@/types/apply";
import { create } from "zustand";

type QuestionList = Question[];

type QuestionListState = {
    basicQuestionList: QuestionList;
    setBasicQuestionList: (list: QuestionList) => void;

    commonQuestionList: QuestionList;
    setCommonQuestionList: (list: QuestionList) => void;

    operationQuestionList: QuestionList;
    setOperationQuestionList: (list: QuestionList) => void;

    marketingQuestionList: QuestionList;
    setMarketingQuestionList: (list: QuestionList) => void;

    academicQuestionList: QuestionList;
    setAcademicQuestionList: (list: QuestionList) => void;

    frontendQuestionList: QuestionList;
    setFrontendQuestionList: (list: QuestionList) => void;

    backendQuestionList: QuestionList;
    setBackendQuestionList: (list: QuestionList) => void;

    aiQuestionList: QuestionList;
    setAiQuestionList: (list: QuestionList) => void;

    designQuestionList: QuestionList;
    setDesignQuestionList: (list: QuestionList) => void;

    planQuestionList: QuestionList;
    setPlanQuestionList: (list: QuestionList) => void;

    getAllManagerQuestions: () => Question[];
    getAllUserQuestions: () => Question[];
};

export const useQuestionListsStore = create<QuestionListState>((set, get) => ({
    // 기본 질문
    basicQuestionList: [],
    setBasicQuestionList: (list) => set({ basicQuestionList: list }),

    // 공통 질문
    commonQuestionList: [],
    setCommonQuestionList: (list) => set({ commonQuestionList: list }),

    // 운영진 부서 질문
    operationQuestionList: [],
    setOperationQuestionList: (list) => set({ operationQuestionList: list }),

    marketingQuestionList: [],
    setMarketingQuestionList: (list) => set({ marketingQuestionList: list }),

    academicQuestionList: [],
    setAcademicQuestionList: (list) => set({ academicQuestionList: list }),

    // 운영진 + 아기사자 파트 질문
    frontendQuestionList: [],
    setFrontendQuestionList: (list) => set({ frontendQuestionList: list }),

    backendQuestionList: [],
    setBackendQuestionList: (list) => set({ backendQuestionList: list }),

    aiQuestionList: [],
    setAiQuestionList: (list) => set({ aiQuestionList: list }),

    designQuestionList: [],
    setDesignQuestionList: (list) => set({ designQuestionList: list }),

    planQuestionList: [],
    setPlanQuestionList: (list) => set({ planQuestionList: list }),

    getAllManagerQuestions: () => {
        const s = get();
        return [
            ...s.basicQuestionList,
            ...s.commonQuestionList,
            ...s.operationQuestionList,
            ...s.marketingQuestionList,
            ...s.academicQuestionList,
            ...s.frontendQuestionList,
            ...s.backendQuestionList,
            ...s.aiQuestionList,
            ...s.designQuestionList,
            ...s.planQuestionList
        ];
    },

    getAllUserQuestions: () => {
        const s = get();
        return [
            ...s.basicQuestionList,
            ...s.commonQuestionList,
            ...s.frontendQuestionList,
            ...s.backendQuestionList,
            ...s.aiQuestionList,
            ...s.designQuestionList,
            ...s.planQuestionList
        ];
    }
}));
