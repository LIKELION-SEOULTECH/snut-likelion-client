import { useState } from "react";
import { RecruitFormStep1 } from "@/components/recruitment/RecruitFormStep1";
import { RecruitFormStep2 } from "@/components/recruitment/RecruitFormStep2";
import { RecruitFormHeader } from "@/components/recruitment/RecruitFormHeader";
import { Footer } from "@/layouts/Footer";
import { useRecruitmentSchedule, useQuestions } from "@/hooks/useRecruitment";
import { postApplication } from "@/apis/main/recruitment";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

interface RecruitFormProps {
    isManeger: boolean;
}
export interface FormDataType {
    part: string;
    departmentType: string;
    name: string;
    major: string;
    studentId: string;
    grade: number;
    inSchool: boolean;
    portfolio: File | null;
    answers: { questionId: number; answer: string }[];
    mobileNumber: string;
}
export const RecruitForm = ({ isManeger }: RecruitFormProps) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState<FormDataType>({
        part: "",
        departmentType: "",
        name: "",
        major: "",
        studentId: "",
        grade: 1,
        inSchool: true,
        portfolio: null,
        answers: [] as { questionId: number; answer: string }[],
        mobileNumber: ""
    });

    const recType = isManeger ? "MANAGER" : "MEMBER";
    const { data: recData } = useRecruitmentSchedule(recType);
    const recId = recData?.data.id;

    const { data: questions, isLoading: loadingQuestions } = useQuestions(recId, {
        part: formData.part,
        department: isManeger ? formData.departmentType : undefined
    });

    const handleSelect = (field: "part" | "departmentType", value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handlePrev = () => setStep((prev) => prev - 1);

    const isValid = isManeger ? !!formData.part && !!formData.departmentType : !!formData.part;

    const applyMutation = useMutation({
        mutationFn: ({ submit }: { submit: boolean }) => {
            if (!recId) throw new Error("recId가 없습니다.");

            return postApplication(recId, submit, {
                major: formData.major,
                studentId: formData.studentId,
                grade: formData.grade,
                inSchool: formData.inSchool,
                answers: formData.answers,
                isPersonalInfoConsent: true,
                part: formData.part,
                ...(isManeger ? { departmentType: formData.departmentType } : {}),
                portfolio: formData.portfolio
            });
        },
        onSuccess: (_, vars) => {
            alert(vars.submit ? "지원서가 제출되었습니다!" : "임시 저장되었습니다!");
            if (vars.submit) navigate(ROUTES.MYPAGE);
        },
        onError: (e) => {
            console.error(e);
            alert("저장 중 오류가 발생했습니다.");
        }
    });

    const handleTempSave = () => applyMutation.mutate({ submit: false });
    const handleSubmit = () => applyMutation.mutate({ submit: true });
    return (
        <div
            className={`w-full flex flex-col bg-[#1B1B1B] ${step === 1 ? "h-screen " : "min-h-screen"}`}
        >
            <RecruitFormHeader
                isManeger={isManeger}
                onNext={handleNext}
                onPrev={handlePrev}
                isValid={isValid}
                onTempSave={handleTempSave}
                onSubmit={handleSubmit}
                step={step}
            />
            <div className="flex-1 flex overflow-y-auto">
                {step === 1 && (
                    <RecruitFormStep1
                        isManeger={isManeger}
                        selectedPart={formData.part}
                        selectedDepartment={formData.departmentType}
                        onSelect={handleSelect}
                        onNext={handleNext}
                    />
                )}
                {step === 2 && (
                    <RecruitFormStep2
                        formData={formData}
                        setFormData={setFormData}
                        questions={questions || []}
                        loading={loadingQuestions}
                        isManeger={isManeger}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
};
