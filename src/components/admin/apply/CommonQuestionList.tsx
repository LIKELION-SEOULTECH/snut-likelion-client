import { useEffect } from "react";
import QuestionList from "./QuestionList";
import { useQuestionListsStore } from "@/stores/useQuestionListStore";
import type { Question } from "@/types/apply";

const initialQuestions: Question[] = [
    {
        id: 1,
        text: "이거 구현 할 수가 있나 개빡세보이는데",
        questionTarget: "COMMON",
        questionType: "장문형",
        part: "",
        departmentType: "",
        order: 0
    },
    {
        id: 2,
        text: "공통 질문 보통 뭐 있어요? 대충 써놓을게요",
        questionTarget: "COMMON",
        questionType: "장문형",
        part: "",
        departmentType: "",
        order: 1
    }
];
export const CommonQuestionList = () => {
    const questions = useQuestionListsStore((s) => s.commonQuestionList);
    const setCommonQuestionList = useQuestionListsStore((s) => s.setCommonQuestionList);

    useEffect(() => {
        if (questions.length === 0) {
            setCommonQuestionList(initialQuestions);
        }
    }, [questions.length, setCommonQuestionList]);

    // React setState 형태로 zustand setter를 어댑팅
    const setQuestions: React.Dispatch<React.SetStateAction<typeof questions>> = (next) => {
        if (typeof next === "function") {
            setCommonQuestionList(
                (next as (prev: typeof questions) => typeof questions)(questions)
            );
        } else {
            setCommonQuestionList(next);
        }
    };

    return (
        <QuestionList
            title="공통질문"
            questions={questions}
            setQuestions={setQuestions}
            questionTarget="COMMON"
        />
    );
};
