import { useState } from "react";
import QuestionList from "./QuestionList";

const initialQuestions = [
    { id: "1", text: "공통 질문 보통 뭐 있어요? 대충 써놓을게요", type: "장문형" },
    { id: "2", text: "공통 질문 보통 뭐 있어요? 대충 써놓을게요", type: "장문형" }
];

export const PlanQuestionList = () => {
    const [questions, setQuestions] = useState(initialQuestions);

    return <QuestionList title="기획" questions={questions} setQuestions={setQuestions} />;
};

export const DesignQuestionList = () => {
    const [questions, setQuestions] = useState(initialQuestions);

    return <QuestionList title="디자인" questions={questions} setQuestions={setQuestions} />;
};

export const FrontendQuestionList = () => {
    const [questions, setQuestions] = useState(initialQuestions);

    return <QuestionList title="프론트엔드" questions={questions} setQuestions={setQuestions} />;
};

export const BackendQuestionList = () => {
    const [questions, setQuestions] = useState(initialQuestions);

    return <QuestionList title="백엔드" questions={questions} setQuestions={setQuestions} />;
};

export const AIQuestionList = () => {
    const [questions, setQuestions] = useState(initialQuestions);

    return <QuestionList title="AI" questions={questions} setQuestions={setQuestions} />;
};
