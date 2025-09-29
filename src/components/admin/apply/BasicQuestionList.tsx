import { useEffect } from "react";
import QuestionList from "./QuestionList";
import { useQuestionListsStore } from "@/stores/useQuestionListStore";
import type { Question } from "@/types/apply";

const initialQuestions: Question[] = [
    {
        id: 1,
        text: "이름",
        questionTarget: "BASIC",
        questionType: "장문형",
        part: "",
        departmentType: "",
        order: 0
    },
    {
        id: 2,
        text: "학과",
        questionTarget: "BASIC",
        questionType: "장문형",
        part: "",
        departmentType: "",
        order: 1
    },
    {
        id: 3,
        text: "학번",
        questionTarget: "BASIC",
        questionType: "단답형",
        part: "",
        departmentType: "",
        order: 0
    },
    {
        id: 4,
        text: "휴대폰 번호",
        questionTarget: "BASIC",
        questionType: "단답형",
        part: "",
        departmentType: "",
        order: 1
    },
    {
        id: 5,
        text: "학년 (올해 기준)",
        questionTarget: "BASIC",
        questionType: "라디오 버튼",
        part: "",
        departmentType: "",
        order: 0,
        options: ["1학년"]
    },
    {
        id: 6,
        text: "학적 상태",
        questionTarget: "BASIC",
        questionType: "라디오 버튼",
        part: "",
        departmentType: "",
        order: 1,
        options: ["재학 중"]
    }
];

export const BasicQuestionList = () => {
    const questions = useQuestionListsStore((s) => s.basicQuestionList);
    const setBasicQuestionList = useQuestionListsStore((s) => s.setBasicQuestionList);

    useEffect(() => {
        if (questions.length === 0) {
            setBasicQuestionList(initialQuestions);
        }
    }, [questions.length, setBasicQuestionList]);

    // React setState 형태로 zustand setter를 어댑팅
    const setQuestions: React.Dispatch<React.SetStateAction<typeof questions>> = (next) => {
        if (typeof next === "function") {
            setBasicQuestionList((next as (prev: typeof questions) => typeof questions)(questions));
        } else {
            setBasicQuestionList(next);
        }
    };
    return (
        <QuestionList
            title="기본 질문"
            questions={questions}
            setQuestions={setQuestions}
            questionTarget="COMMON"
        />
    );
};
