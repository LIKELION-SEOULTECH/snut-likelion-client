import { useEffect, useState } from "react";
import { RecruitFormStep1 } from "@/components/Recruit/RecruitFormStep1";
import { RecruitFormStep2 } from "@/components/Recruit/RecruitFormStep2";
import { RecruitFormHeader } from "@/components/Recruit/RecruitFormHeader";
import { Footer } from "@/layouts/Footer";
// import type { QuestionResponse } from "@/types/Recruits";
import { fetchRecentRecruitment } from "@/apis/recruit";
import type { QuestionResponse } from "@/types/Recruits";
import { fetchQuestions } from "@/apis/recruitform";
// import { fetchQuestions } from "@/apis/Recuit";

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
    const [step, setStep] = useState(1);

    // 지원서
    const [formData, setFormData] = useState<FormDataType>({
        part: "", // 파트
        departmentType: "", // 운영진 부서
        name: "",
        major: "",
        studentId: "",
        grade: 1,
        inSchool: true,
        // isPersonalInfoConsent: false, -> 뺄수도 있음
        portfolio: null as File | null,
        answers: [] as { questionId: number; answer: string }[],
        mobileNumber: ""
    });
    const [questions, setQuestions] = useState<QuestionResponse[]>([]);
    const [loadingQuestions, setLoadingQuestions] = useState(false);

    useEffect(() => {
        if (step !== 2) return;
        console.log("▶ Entering step 2, formData:", {
            part: formData.part,
            department: formData.departmentType
        });

        (async () => {
            setLoadingQuestions(true);
            try {
                const recType = isManeger ? "MANAGER" : "MEMBER";
                const recRes = await fetchRecentRecruitment(recType);

                const qs = await fetchQuestions(recRes.data.id, {
                    part: formData.part,
                    department: isManeger ? formData.departmentType : undefined
                });
                setQuestions(qs);
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingQuestions(false);
            }
        })();
    }, [step, isManeger, formData.part, formData.departmentType]);

    // 파트. 부서 행들러
    const handleSelect = (field: "part" | "departmentType", value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // 다음 스텝으로..
    const handleNext = () => setStep((prev) => prev + 1);

    // !! : 비었는지 확인에 쓰는..... 불리언으로 리턴 굿
    const isValid = isManeger ? !!formData.part && !!formData.departmentType : !!formData.part;

    return (
        <div
            className={`w-full flex flex-col bg-[#1B1B1B] ${step === 1 ? "h-screen " : "min-h-screen"}`}
        >
            <RecruitFormHeader
                isManeger={isManeger}
                onNext={handleNext}
                isValid={isValid}
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
                        questions={questions}
                        loading={loadingQuestions}
                        isManeger={isManeger}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
};
