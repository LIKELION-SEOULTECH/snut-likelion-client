import { useState } from "react";
import QuestionList from "./QuestionList";

const initialQuestions = [
    { id: "1", text: "공통 질문 보통 뭐 있어요? 대충 써놓을게요", type: "장문형" },
    { id: "2", text: "공통 질문 보통 뭐 있어요? 대충 써놓을게요", type: "장문형" }
];

export const OpsQuestionList = () => {
    const [questions, setQuestions] = useState(initialQuestions);

    return <QuestionList title="운영부" questions={questions} setQuestions={setQuestions} />;
};

export const AcademicsQuestionList = () => {
    const [questions, setQuestions] = useState(initialQuestions);

    return <QuestionList title="학술부" questions={questions} setQuestions={setQuestions} />;
};

export const PRQuestionList = () => {
    const [questions, setQuestions] = useState(initialQuestions);

    return <QuestionList title="홍보부" questions={questions} setQuestions={setQuestions} />;
};
