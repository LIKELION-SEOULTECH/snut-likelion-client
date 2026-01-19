import type { Question } from "@/types/apply";

export const splitQuestions = (questions: Question[]) => {
    const basic: Question[] = [];
    const common: Question[] = [];
    const partMap: Record<string, Question[]> = {};
    const departmentMap: Record<string, Question[]> = {};

    questions.forEach((q) => {
        if (q.questionTarget === "공통 질문" || q.questionTarget === "기본 질문") {
            common.push(q);
        }

        if (q.questionTarget === "파트 질문" && q.part) {
            partMap[q.part] ??= [];
            partMap[q.part].push(q);
        }

        if (q.questionTarget === "부서 질문" && q.departmentType) {
            departmentMap[q.departmentType] ??= [];
            departmentMap[q.departmentType].push(q);
        }
    });

    return { basic, common, partMap, departmentMap };
};
