import type { QNAItem } from "@/types/apply";
import { QuestionSection } from "./QuestionSection";

export const ApplyResult = ({ answers, portfolio }: { answers: QNAItem[]; portfolio: string }) => {
    const basicItems = answers
        .filter((a: QNAItem) => a.questionTarget === "DEFAULT")
        .sort((a: QNAItem, b: QNAItem) => a.order - b.order);

    const commonItems = answers
        .filter((a: QNAItem) => a.questionTarget === "COMMON")
        .sort((a: QNAItem, b: QNAItem) => a.order - b.order);

    const partItems = answers
        .filter((a: QNAItem) => a.questionTarget === "PART")
        .sort((a: QNAItem, b: QNAItem) => a.order - b.order);

    const departmentItems = answers
        .filter((a: QNAItem) => a.questionTarget === "DEPARTMENT")
        .sort((a: QNAItem, b: QNAItem) => a.order - b.order);

    return (
        <>
            <div className="flex flex-col py-12 px-15 bg-white text-black mb-12 rounded-sm">
                <span className="text-xl font-semibold mb-6">기본 질문</span>
                {basicItems.map(({ questionId, questionText, answer }, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === basicItems.length - 1;

                    return (
                        <div
                            key={questionId}
                            className={`flex items-center h-[107px] px-[30px] 
                        ${isFirst ? "border-t-2 border-[#7F7F7F]" : ""}
                        ${isLast ? "border-b-2 border-[#7F7F7F]" : ""}
                        ${!isLast ? "border-b border-[#7F7F7F]" : ""}
                    `}
                        >
                            <span className="w-[135px]">{questionText}</span>
                            <span>{answer}</span>
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-col gap-16 mb-16">
                <QuestionSection title="공통 질문" items={commonItems} />
                <QuestionSection title="파트 질문" items={partItems} />
                <QuestionSection title="학과 질문" items={departmentItems} />
                {portfolio && (
                    <div className="flex flex-col py-12 px-15 bg-white text-black mb-12 rounded-sm">
                        <span className="text-xl font-semibold mb-6">포트폴리오</span>
                        <div className="flex flex-row items-center h-[107px] px-[30px] border-y-2 border-[#7F7F7F]">
                            <span className="shrink-0 w-[135px]">링크</span>
                            <span>{portfolio}</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
