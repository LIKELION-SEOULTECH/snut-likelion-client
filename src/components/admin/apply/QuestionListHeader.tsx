import QuestionChevDown from "@/assets/admin/question-chevdown.svg?react";
import QuestionChevUp from "@/assets/admin/question-chevup.svg?react";

interface QuestionListHeaderProps {
    title: string;
    firstQuestionText?: string;
    isCollapsed: boolean;
    onToggle: () => void;
}

export const QuestionListHeader = ({ title, isCollapsed, onToggle }: QuestionListHeaderProps) => {
    return (
        <div
            className={`flex justify-between items-center cursor-pointer ${
                isCollapsed ? "mb-0" : "mb-10"
            }`}
            onClick={onToggle}
        >
            <div className="font-semibold text-xl">{title}</div>
            {isCollapsed ? <QuestionChevDown /> : <QuestionChevUp />}
        </div>
    );
};
