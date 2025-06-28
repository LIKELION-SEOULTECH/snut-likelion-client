import { useState } from "react";
import { RecruitFormStep1 } from "@/components/Recruit/RecruitFormStep1";
import { RecruitFormStep2 } from "@/components/Recruit/RecruitFormStep2";
import { RecruitFormHeader } from "@/components/Recruit/RecruitFormHeader";

interface RecruitFormProps {
    isManeger: boolean;
}

export const RecruitForm = ({ isManeger }: RecruitFormProps) => {
    const [step, setStep] = useState(1);

    // 지원서
    const [formData, setFormData] = useState({
        part: "", // 파트
        departmentType: "", // 운영진 부서
        name: "",
        major: "",
        studentId: "",
        grade: 1,
        inSchool: true,
        // isPersonalInfoConsent: false, -> 뺄수도 있음
        portfolio: null as File | null,
        answers: [] as { questionId: number; answer: string }[]
    });

    // 파트. 부서 행들러
    const handleSelect = (field: "part" | "departmentType", value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // 다음 스텝으로..
    const handleNext = () => setStep((prev) => prev + 1);

    // !! : 비었는지 확인에 쓰는..... 불리언으로 리턴 굿
    const isValid = isManeger ? !!formData.part && !!formData.departmentType : !!formData.part;

    return (
        <div>
            <RecruitFormHeader isManeger={isManeger} onNext={handleNext} isValid={isValid} />
            <div>
                {step === 1 && (
                    <RecruitFormStep1
                        isManeger={isManeger}
                        selectedPart={formData.part}
                        selectedDepartment={formData.departmentType}
                        onSelect={handleSelect}
                        onNext={handleNext}
                    />
                )}
                {step === 2 && <RecruitFormStep2 />}
            </div>
        </div>
    );
};
