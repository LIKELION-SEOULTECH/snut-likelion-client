import { useEffect } from "react";
import QuestionList from "./QuestionList";
import type { Question } from "@/types/apply";
import { useQuestionListsStore } from "@/stores/useQuestionListStore";

const initialQuestions: Question[] = [
    {
        id: 1,
        text: "공통 질문 보통 뭐 있어요? 대충 써놓을게요",
        questionTarget: "PART",
        questionType: "장문형",
        part: "",
        departmentType: "",
        order: 0
    },
    {
        id: 2,
        text: "공통 질문 보통 뭐 있어요? 대충 써놓을게요",
        questionTarget: "PART",
        questionType: "장문형",
        part: "",
        departmentType: "",
        order: 1
    }
];

// 파트별 초기값 생성 헬퍼
const makeInitialByPart = (part: string) =>
    initialQuestions.map((q, i) => ({ ...q, part, order: i }));

/* -------------------- 기획 -------------------- */
export const PlanQuestionList = () => {
    const questions = useQuestionListsStore((s) => s.planQuestionList);
    const setPlanQuestionList = useQuestionListsStore((s) => s.setPlanQuestionList);

    useEffect(() => {
        if (questions.length === 0) setPlanQuestionList(makeInitialByPart("PLANNING"));
    }, [questions.length, setPlanQuestionList]);

    const setQuestions: React.Dispatch<React.SetStateAction<typeof questions>> = (next) => {
        if (typeof next === "function") {
            setPlanQuestionList((next as (prev: typeof questions) => typeof questions)(questions));
        } else {
            setPlanQuestionList(next);
        }
    };

    return (
        <QuestionList
            title="기획"
            questions={questions}
            setQuestions={setQuestions}
            part="PLANNING"
            questionTarget="PART"
        />
    );
};

/* -------------------- 디자인 -------------------- */
export const DesignQuestionList = () => {
    const questions = useQuestionListsStore((s) => s.designQuestionList);
    const setDesignQuestionList = useQuestionListsStore((s) => s.setDesignQuestionList);

    useEffect(() => {
        if (questions.length === 0) setDesignQuestionList(makeInitialByPart("DESIGN"));
    }, [questions.length, setDesignQuestionList]);

    const setQuestions: React.Dispatch<React.SetStateAction<typeof questions>> = (next) => {
        if (typeof next === "function") {
            setDesignQuestionList(
                (next as (prev: typeof questions) => typeof questions)(questions)
            );
        } else {
            setDesignQuestionList(next);
        }
    };

    return (
        <QuestionList
            title="디자인"
            questions={questions}
            setQuestions={setQuestions}
            part="DESIGN"
            questionTarget="PART"
        />
    );
};

/* -------------------- 프론트엔드 -------------------- */
export const FrontendQuestionList = () => {
    const questions = useQuestionListsStore((s) => s.frontendQuestionList);
    const setFrontendQuestionList = useQuestionListsStore((s) => s.setFrontendQuestionList);

    useEffect(() => {
        if (questions.length === 0) setFrontendQuestionList(makeInitialByPart("FRONTEND"));
    }, [questions.length, setFrontendQuestionList]);

    const setQuestions: React.Dispatch<React.SetStateAction<typeof questions>> = (next) => {
        if (typeof next === "function") {
            setFrontendQuestionList(
                (next as (prev: typeof questions) => typeof questions)(questions)
            );
        } else {
            setFrontendQuestionList(next);
        }
    };

    return (
        <QuestionList
            title="프론트엔드"
            questions={questions}
            setQuestions={setQuestions}
            part="FRONTEND"
            questionTarget="PART"
        />
    );
};

/* -------------------- 백엔드 -------------------- */
export const BackendQuestionList = () => {
    const questions = useQuestionListsStore((s) => s.backendQuestionList);
    const setBackendQuestionList = useQuestionListsStore((s) => s.setBackendQuestionList);

    useEffect(() => {
        if (questions.length === 0) setBackendQuestionList(makeInitialByPart("BACKEND"));
    }, [questions.length, setBackendQuestionList]);

    const setQuestions: React.Dispatch<React.SetStateAction<typeof questions>> = (next) => {
        if (typeof next === "function") {
            setBackendQuestionList(
                (next as (prev: typeof questions) => typeof questions)(questions)
            );
        } else {
            setBackendQuestionList(next);
        }
    };

    return (
        <QuestionList
            title="백엔드"
            questions={questions}
            setQuestions={setQuestions}
            part="BACKEND"
            questionTarget="PART"
        />
    );
};

/* -------------------- AI -------------------- */
export const AIQuestionList = () => {
    const questions = useQuestionListsStore((s) => s.aiQuestionList);
    const setAiQuestionList = useQuestionListsStore((s) => s.setAiQuestionList);

    useEffect(() => {
        if (questions.length === 0) setAiQuestionList(makeInitialByPart("AI"));
    }, [questions.length, setAiQuestionList]);

    const setQuestions: React.Dispatch<React.SetStateAction<typeof questions>> = (next) => {
        if (typeof next === "function") {
            setAiQuestionList((next as (prev: typeof questions) => typeof questions)(questions));
        } else {
            setAiQuestionList(next);
        }
    };

    return (
        <QuestionList
            title="AI"
            questions={questions}
            setQuestions={setQuestions}
            part="AI"
            questionTarget="PART"
        />
    );
};
