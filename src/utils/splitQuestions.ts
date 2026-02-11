import type { Question } from "@/types/apply";

export const splitQuestions = (questions: Question[]) => {
    const basic: Question[] = [];
    const common: Question[] = [];
    const partMap: Record<string, Question[]> = {};
    const departmentMap: Record<string, Question[]> = {};

    questions.forEach((q) => {
        if (q.questionTarget === "DEFAULT") {
            basic.push(q);
        }
        if (q.questionTarget === "COMMON") {
            common.push(q);
        }

        if (q.questionTarget === "PART" && q.part) {
            partMap[q.part] ??= [];
            partMap[q.part].push(q);
        }

        if (q.questionTarget === "DEPARTMENT" && q.departmentType) {
            departmentMap[q.departmentType] ??= [];
            departmentMap[q.departmentType].push(q);
        }
    });

    return { basic, common, partMap, departmentMap };
};
