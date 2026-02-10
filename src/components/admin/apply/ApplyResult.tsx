import type { QNAItem } from "@/types/apply";
import { QuestionSection } from "./QuestionSection";

interface BasicApplyResultProps {
    applicationDetail: {
        username: string;
        studentId: string;
        major: string;
        departmentType: string;
        part: string;
        grade: number;
        inSchool: boolean;
        phoneNumber: string;
        portfolio?: string;
        status: string;
        submittedAt: string;
    };
}

export const BasicApplyResult = ({ applicationDetail }: BasicApplyResultProps) => {
    const { username, studentId, major, grade, inSchool, phoneNumber } = applicationDetail;
    const items = [
        { label: "이름", value: username },
        { label: "학번", value: studentId },
        { label: "학과", value: major },
        { label: "휴대폰 번호", value: phoneNumber },
        { label: "학년", value: grade },
        { label: "학적상태", value: inSchool ? "재학" : "휴학" }
    ];

    return (
        <div className="flex flex-col py-12 px-15 bg-white text-black mb-12 rounded-sm">
            <span className="text-xl font-semibold mb-6">기본 질문</span>
            {items.map(({ label, value }, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === items.length - 1;

                return (
                    <div
                        key={label}
                        className={`flex items-center h-[107px] px-[30px] 
                            ${isFirst ? "border-t-2 border-[#7F7F7F]" : ""}
                            ${isLast ? "border-b-2 border-[#7F7F7F]" : ""}
                            ${!isLast ? "border-b border-[#7F7F7F]" : ""}
                        `}
                    >
                        <span className="w-[135px]">{label}</span>
                        <span>{value}</span>
                    </div>
                );
            })}
        </div>
    );
};

export const CommonApplyResult = ({ answers }: { answers: QNAItem[] }) => {
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
        <div className="flex flex-col gap-16 mb-16">
            <QuestionSection title="공통 질문" items={commonItems} />
            <QuestionSection title="파트 질문" items={partItems} />
            <QuestionSection title="학과 질문" items={departmentItems} />
        </div>
    );
};
