// import { useEffect } from "react";
import QuestionList from "./QuestionList";
import { useQuestionListsStore } from "@/stores/useQuestionListStore";
// import type { Question } from "@/types/apply";
// import { nanoid } from "nanoid";

// const initialQuestions: Question[] = [
//     {
//         clientId: nanoid(),
//         text: "이름",
//         questionTarget: "COMMON",
//         questionType: "LONG",
//         part: "",
//         departmentType: "",
//         order: 0
//     },
//     {
//         clientId: nanoid(),
//         text: "학과",
//         questionTarget: "COMMON",
//         questionType: "LONG",
//         part: "",
//         departmentType: "",
//         order: 1
//     },
//     {
//         clientId: nanoid(),
//         text: "학번",
//         questionTarget: "COMMON",
//         questionType: "SHORT",
//         part: "",
//         departmentType: "",
//         order: 0
//     },
//     {
//         clientId: nanoid(),
//         text: "휴대폰 번호",
//         questionTarget: "COMMON",
//         questionType: "SHORT",
//         part: "",
//         departmentType: "",
//         order: 1
//     },
//     {
//         clientId: nanoid(),
//         text: "학년 (올해 기준)",
//         questionTarget: "COMMON",
//         questionType: "RADIO_BUTTON",
//         part: "",
//         departmentType: "",
//         order: 0,
//         buttonList: ["1학년", "2학년"]
//     },
//     {
//         clientId: nanoid(),
//         text: "학적 상태",
//         questionTarget: "COMMON",
//         questionType: "RADIO_BUTTON",
//         part: "",
//         departmentType: "",
//         order: 1,
//         buttonList: ["재학 중", "휴학 중"]
//     }
// ];

export const BasicQuestionList = () => {
    const questions = useQuestionListsStore((s) => s.basicQuestionList);
    const setBasicQuestionList = useQuestionListsStore((s) => s.setBasicQuestionList);

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
