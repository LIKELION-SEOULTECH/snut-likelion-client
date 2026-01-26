import type { FormDataType } from "@/pages/main/RecruitForm";
import { AnswerBox } from "./FormAnswerBox";
import { FormUserInfoBox } from "./FormUserInfoBox";
import type { QuestionResponse } from "@/types/recruitment";
import { FormBox } from "./FormBox";

interface RecruitFormStep2Props {
    formData: FormDataType;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
    questions: QuestionResponse[];
    loading: boolean;
    isManeger: boolean;
}
// 변환 맵
const PART_ID_TO_KO: Record<string, string> = {
    PLANNING: "기획자",
    DESIGN: "디자이너",
    FRONTEND: "프론트엔드",
    BACKEND: "백엔드",
    AI: "인공지능"
};

const DEPT_ID_TO_KO: Record<string, string> = {
    ACADEMIC: "학술부",
    MARKETING: "홍보부",
    OPERATION: "운영부"
};

export const RecruitFormStep2 = ({
    formData,
    setFormData,
    questions,
    loading,
    isManeger
}: RecruitFormStep2Props) => {
    if (loading) {
        return <div className="text-white p-8">질문을 불러오는 중…</div>;
    }
    // 질문 내가 고른것만..
    // 공통 질문
    const commonQs = questions
        .filter((q) => q.questionTarget === "COMMON")
        .sort((a, b) => a.orderNum - b.orderNum);

    // 파트 질문
    const partQs = questions
        .filter((q) => q.questionTarget === "PART" && q.part === formData.part)
        .sort((a, b) => a.orderNum - b.orderNum);

    const deptQs = isManeger
        ? questions
              .filter(
                  (q) =>
                      q.questionTarget === "DEPARTMENT" &&
                      q.departmentType === formData.departmentType
              )
              .sort((a, b) => a.orderNum - b.orderNum)
        : [];

    const handleAnswerChange = (questionId: number, answer: string) => {
        setFormData((prev) => {
            const other = prev.answers.filter((a) => a.questionId !== questionId);
            return {
                ...prev,
                answers: [...other, { questionId, answer }]
            };
        });
    };

    const toItems = (qs: QuestionResponse[]) =>
        qs.map((q) => ({
            questionId: q.id,
            label: q.text,
            answer: formData.answers.find((a) => a.questionId === q.id)?.answer || ""
        }));

    return (
        <div className="bg-[#1B1B1B] w-full h-auto pt-[72px] px-[112px] space-y-12">
            <h4 className="text-[32px] text-white font-bold">기본 질문</h4>

            <FormUserInfoBox
                name={formData.username}
                major={formData.major}
                studentId={formData.studentId}
                inSchool={formData.inSchool}
                grade={formData.grade}
                phoneNumber={formData.phoneNumber}
                onChange={(field, value) => setFormData((prev) => ({ ...prev, [field]: value }))}
            />

            {/* 공통 질문 */}
            {commonQs.length > 0 && (
                <>
                    <h4 className="text-[32px] text-white font-bold mt-[150px]">공통 질문</h4>
                    <AnswerBox questions={toItems(commonQs)} onChange={handleAnswerChange} />
                </>
            )}

            {/* 파트 질문 */}
            {partQs.length > 0 && (
                <>
                    <h4 className="text-[32px] text-white font-bold">
                        {PART_ID_TO_KO[formData.part]} 질문
                    </h4>
                    <AnswerBox questions={toItems(partQs)} onChange={handleAnswerChange} />
                </>
            )}

            {/*  부서 질문 운영진꺼요*/}
            {isManeger && deptQs.length > 0 && (
                <>
                    <h4 className="text-[32px] text-white font-bold">
                        {DEPT_ID_TO_KO[formData.departmentType]} 질문
                    </h4>
                    <AnswerBox questions={toItems(deptQs)} onChange={handleAnswerChange} />
                </>
            )}
            <>
                <div className="flex">
                    <h4 className="text-[32px] text-white font-bold mt-[150px]">포트폴리오 첨부</h4>
                    <span className="ml-4 mt-[160px] text-[#A7A7A7]">
                        * 첨부하지 않아도 불이익은 없어요
                    </span>
                </div>
                <div className="pb-20">
                    <FormBox>
                        <div className="flex gap-[137px] items-center">
                            <h4>링크</h4>
                            <input
                                type="text"
                                placeholder="http://"
                                value={formData.portfolio ?? ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        portfolio: e.target.value
                                    }))
                                }
                                className="bg-white rounded-[4px] px-4 py-[14px] max-w-[680px] w-full text-black"
                            />
                        </div>
                    </FormBox>
                </div>
            </>
        </div>
    );
};
