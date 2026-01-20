import type { Question } from "@/types/apply";
import { nanoid } from "nanoid";

export const initialQuestions: Question[] = [
    {
        clientId: nanoid(),
        text: "공통 질문 보통 뭐 있어요? 대충 써놓을게요",
        questionTarget: "PART",
        questionType: "LONG",
        part: "",
        departmentType: "",
        order: 0
    },
    {
        clientId: nanoid(),
        text: "공통 질문 보통 뭐 있어요? 대충 써놓을게요",
        questionTarget: "PART",
        questionType: "LONG",
        part: "",
        departmentType: "",
        order: 1
    }
];
