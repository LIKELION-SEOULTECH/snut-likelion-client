import QuestionList from "./QuestionList";
import { useQuestionListsStore } from "@/stores/useQuestionListStore";

/* -------------------- 기획 -------------------- */
export const PlanQuestionList = () => {
    const questions = useQuestionListsStore((s) => s.planQuestionList);
    const setPlanQuestionList = useQuestionListsStore((s) => s.setPlanQuestionList);

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
