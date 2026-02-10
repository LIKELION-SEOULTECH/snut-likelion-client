import type { Question } from "@/types/apply";
import { nanoid } from "nanoid";

export const createPartInitialQuestions = (part: Question["part"]): Question[] => [
    {
        clientId: nanoid(),
        text: "질문을 입력해주세요",
        questionTarget: "PART",
        questionType: "LONG",
        part,
        departmentType: "",
        order: 0
    },
    {
        clientId: nanoid(),
        text: "질문을 입력해주세요",
        questionTarget: "PART",
        questionType: "LONG",
        part,
        departmentType: "",
        order: 0
    }
];

export const createDepartmentInitialQuestions = (
    departmentType: Question["departmentType"]
): Question[] => [
    {
        clientId: nanoid(),
        text: "질문을 입력해주세요",
        questionTarget: "DEPARTMENT",
        questionType: "LONG",
        part: "",
        departmentType,
        order: 0
    },
    {
        clientId: nanoid(),
        text: "질문을 입력해주세요",
        questionTarget: "DEPARTMENT",
        questionType: "LONG",
        part: "",
        departmentType,
        order: 0
    }
];
