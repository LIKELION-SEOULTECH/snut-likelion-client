import { useState } from "react";
import QuestionList from "./QuestionList";

const initialQuestions = [
    { id: "1", text: "이름", type: "단답형" },
    { id: "2", text: "학과", type: "단답형" },
    { id: "3", text: "학번", type: "단답형" },
    { id: "4", text: "휴대폰 번호", type: "단답형" },
    { id: "5", text: "학년 (올해 기준)", type: "단답형" },
    { id: "6", text: "학적 상태", type: "단답형" }
];

export const BasicQuestionList = ({
    recId,
    onSave
}: {
    recId: number;
    onSave?: (fn: () => void) => void;
}) => {
    const [questions, setQuestions] = useState(initialQuestions);

    return (
        <QuestionList
            title="기본 질문"
            questions={questions}
            setQuestions={setQuestions}
            recId={recId}
            questionTarget="COMMON"
            onSave={onSave}
        />
    );
};
