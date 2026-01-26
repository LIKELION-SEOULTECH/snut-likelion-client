import { useEffect, useState } from "react";
import { RecruitFormStep1 } from "@/components/recruitment/RecruitFormStep1";
import { RecruitFormStep2 } from "@/components/recruitment/RecruitFormStep2";
import { RecruitFormHeader } from "@/components/recruitment/RecruitFormHeader";
import { Footer } from "@/layouts/Footer";
import { useRecruitmentSchedule, useQuestions } from "@/hooks/useRecruitment";
import { patchApplication, postApplication } from "@/apis/main/recruitment";
import { ROUTES } from "@/routes/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

interface RecruitFormProps {
    isManeger: boolean;
}
export interface FormDataType {
    part: string;
    departmentType: string;
    username: string;
    major: string;
    studentId: string;
    grade: number;
    inSchool: boolean;
    portfolio: string | null;
    answers: { questionId: number; answer: string }[];
    phoneNumber: string;
}
export const RecruitForm = ({ isManeger }: RecruitFormProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const navState = location.state as
        | { mode?: "edit"; step?: number; appId?: number; application?: FormDataType }
        | undefined;

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState<FormDataType>({
        part: "",
        departmentType: "",
        username: "",
        major: "",
        studentId: "",
        grade: 1,
        inSchool: true,
        portfolio: "",
        answers: [] as { questionId: number; answer: string }[],
        phoneNumber: ""
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

    useEffect(() => {
        if (!navState?.application) return;

        const app = navState.application;

        const mappedAnswers =
            app.answers?.map((a: { questionId: number | string; answer: string }) => ({
                questionId: Number(a.questionId),
                answer: a.answer ?? ""
            })) ?? [];

        setFormData((prev) => ({
            ...prev,
            part: app.part ?? "",
            departmentType: app.departmentType ?? "",
            username: app.username ?? "",
            major: app.major ?? "",
            studentId: app.studentId ?? "",
            grade: Number(app.grade ?? 1),
            inSchool: !!app.inSchool,
            phoneNumber: app.phoneNumber ?? "",
            portfolio: app.portfolio ?? "",
            answers: mappedAnswers
        }));

        setStep(navState.step ?? 2);
    }, [navState]);

    const isEdit = navState?.mode === "edit" && typeof navState?.appId === "number";

    const applyMutation = useMutation({
        mutationFn: ({ submit }: { submit: boolean }) => {
            const payload = {
                major: formData.major,
                studentId: formData.studentId,
                grade: formData.grade,
                inSchool: formData.inSchool,
                answers: formData.answers,
                isPersonalInfoConsent: true,
                part: formData.part,
                ...(isManeger ? { departmentType: formData.departmentType } : {}),
                portfolio: formData.portfolio
            };
            if (isEdit) {
                return patchApplication(navState!.appId!, submit, payload);
            }
            if (!recId) throw new Error("recId가 없습니다.");
            return postApplication(recId, submit, payload);
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
