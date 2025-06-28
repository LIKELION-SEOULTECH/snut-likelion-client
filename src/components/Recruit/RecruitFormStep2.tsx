import type { FormDataType } from "@/pages/RecruitForm";
import { AnswerBox } from "./FormAnswerBox";
import { FormUserInfoBox } from "./FormUserInfoBox";

interface RecruitFormStep2Props {
    formData: FormDataType;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export const RecruitFormStep2 = ({ formData, setFormData }: RecruitFormStep2Props) => {
    return (
        <div className="bg-[#1B1B1B] w-full h-auto pt-[72px] px-[112px]">
            <div className=" mb-[120px] ">
                <h4 className="text-[32px] text-[#FFF] font-bold mb-10">기본 질문</h4>
                <FormUserInfoBox
                    name={formData.name}
                    major={formData.major}
                    studentId={formData.studentId}
                    inSchool={formData.inSchool}
                    grade={formData.grade}
                    mobileNumber={formData.mobileNumber}
                    onChange={(field, value) =>
                        setFormData((prev) => ({ ...prev, [field]: value }))
                    }
                />
            </div>

            <AnswerBox
                questions={[
                    {
                        questionId: 1,
                        label: "1. 지원 동기는 무엇인가요?",
                        answer: formData.answers.find((a) => a.questionId === 1)?.answer || ""
                    },
                    {
                        questionId: 2,
                        label: "2. 팀 프로젝트 경험이 있다면 공유해주세요.",
                        answer: formData.answers.find((a) => a.questionId === 2)?.answer || ""
                    }
                ]}
                onChange={(id, answer) =>
                    setFormData((prev) => {
                        const filtered = prev.answers.filter((a) => a.questionId !== id);
                        return {
                            ...prev,
                            answers: [...filtered, { questionId: id, answer }]
                        };
                    })
                }
            />
            <AnswerBox
                questions={[
                    {
                        questionId: 1,
                        label: "1. 지원 동기는 무엇인가요?",
                        answer: formData.answers.find((a) => a.questionId === 1)?.answer || ""
                    },
                    {
                        questionId: 2,
                        label: "2. 팀 프로젝트 경험이 있다면 공유해주세요.",
                        answer: formData.answers.find((a) => a.questionId === 2)?.answer || ""
                    }
                ]}
                onChange={(id, answer) =>
                    setFormData((prev) => {
                        const filtered = prev.answers.filter((a) => a.questionId !== id);
                        return {
                            ...prev,
                            answers: [...filtered, { questionId: id, answer }]
                        };
                    })
                }
            />
        </div>
    );
};
