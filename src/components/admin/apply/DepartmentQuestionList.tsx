import { useEffect } from "react";
import QuestionList from "./QuestionList";
import type { Question } from "@/types/apply";
import { useQuestionListsStore } from "@/stores/useQuestionListStore";
import { nanoid } from "nanoid";

const initialQuestions: Question[] = [
    {
        clientId: nanoid(),
        text: "공통 질문 보통 뭐 있어요? 대충 써놓을게요",
        questionTarget: "DEPARTMENT",
        questionType: "LONG",
        part: "",
        departmentType: "",
        order: 0
    },
    {
        clientId: nanoid(),
        text: "공통 질문 보통 뭐 있어요? 대충 써놓을게요",
        questionTarget: "DEPARTMENT",
        questionType: "LONG",
        part: "",
        departmentType: "",
        order: 1
    }
];

export const OperationQuestionList = () => {
    const questions = useQuestionListsStore((s) => s.operationQuestionList);
    const setOperationQuestionList = useQuestionListsStore((s) => s.setOperationQuestionList);

    useEffect(() => {
        if (questions.length === 0) {
            setOperationQuestionList(initialQuestions);
        }
    }, [questions.length, setOperationQuestionList]);

    const setQuestions: React.Dispatch<React.SetStateAction<typeof questions>> = (next) => {
        if (typeof next === "function") {
            setOperationQuestionList(
                (next as (prev: typeof questions) => typeof questions)(questions)
            );
        } else {
            setOperationQuestionList(next);
        }
    };

    return (
        <QuestionList
            title="운영부"
            questions={questions}
            setQuestions={setQuestions}
            questionTarget="DEPARTMENT"
            departmentType="OPERATION"
        />
    );
};

export const AcademicsQuestionList = () => {
    const questions = useQuestionListsStore((s) => s.academicQuestionList);
    const setAcademicQuestionList = useQuestionListsStore((s) => s.setAcademicQuestionList);

    useEffect(() => {
        if (questions.length === 0) {
            setAcademicQuestionList(initialQuestions);
        }
    }, [questions.length, setAcademicQuestionList]);

    const setQuestions: React.Dispatch<React.SetStateAction<typeof questions>> = (next) => {
        if (typeof next === "function") {
            setAcademicQuestionList(
                (next as (prev: typeof questions) => typeof questions)(questions)
            );
        } else {
            setAcademicQuestionList(next);
        }
    };

    return (
        <QuestionList
            title="학술부"
            questions={questions}
            setQuestions={setQuestions}
            questionTarget="DEPARTMENT"
            departmentType="ACADEMIC"
        />
    );
};

export const MarketingQuestionList = () => {
    const questions = useQuestionListsStore((s) => s.marketingQuestionList);
    const setMarketingQuestionList = useQuestionListsStore((s) => s.setMarketingQuestionList);

    useEffect(() => {
        if (questions.length === 0) {
            setMarketingQuestionList(initialQuestions);
        }
    }, [questions.length, setMarketingQuestionList]);

    const setQuestions: React.Dispatch<React.SetStateAction<typeof questions>> = (next) => {
        if (typeof next === "function") {
            setMarketingQuestionList(
                (next as (prev: typeof questions) => typeof questions)(questions)
            );
        } else {
            setMarketingQuestionList(next);
        }
    };

    return (
        <QuestionList
            title="홍보부"
            questions={questions}
            setQuestions={setQuestions}
            questionTarget="DEPARTMENT"
            departmentType=""
        />
    );
};
