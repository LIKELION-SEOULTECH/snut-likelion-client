import { useEffect, useState } from "react";
import { RecruitFormStep1 } from "@/components/recruitment/RecruitFormStep1";
import { RecruitFormStep2 } from "@/components/recruitment/RecruitFormStep2";
import { RecruitFormHeader } from "@/components/recruitment/RecruitFormHeader";
import { Footer } from "@/layouts/Footer";
import { useRecruitmentSchedule, useQuestions } from "@/hooks/useRecruitment";
import { fetchMyApplications, patchApplication, postApplication } from "@/apis/main/recruitment";
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
        | { mode?: "edit" | "preview"; step?: number; appId?: number; application?: FormDataType }
        | undefined;

    const [currentAppId, setCurrentAppId] = useState<number | null>(navState?.appId ?? null);

    const isPreview = navState?.mode === "preview";
    const [isEdit, setIsEdit] = useState<boolean>(navState?.mode === "edit");

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

    console.log(questions);
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

    const validateBeforeSubmit = () => {
        if (!formData.part) return "파트를 선택해주세요.";
        if (!formData.major.trim()) return "학과를 입력해주세요.";
        if (!formData.studentId.trim()) return "학번을 입력해주세요.";
        if (!formData.username.trim()) return "이름을 입력해주세요.";
        if (!formData.phoneNumber.trim()) return "전화번호를 입력해주세요.";
        if (formData.grade == null || Number.isNaN(Number(formData.grade)))
            return "학년을 입력해주세요.";
        if (isManeger && !formData.departmentType) return "부서를 선택해주세요.";

        const hasEmptyAnswer = formData.answers.length !== questions?.length;
        if (formData.answers.length === 0 || hasEmptyAnswer)
            return "모든 질문에 답변을 작성해주세요.";

        return null;
    };

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
                return patchApplication(currentAppId!, submit, payload);
            }
            if (!recId) throw new Error("저장 중 오류가 발생했습니다");
            return postApplication(recId, submit, payload);
        },
        onSuccess: async (_, vars) => {
            if (currentAppId == null) {
                try {
                    const myApps = await fetchMyApplications();
                    console.log(myApps);
                    if (myApps[0].id) {
                        setCurrentAppId(myApps[0].id);
                        setIsEdit(true);
                    } else {
                        console.warn("appId 재조회 실패");
                    }
                } catch (e) {
                    console.error("appId 재조회 실패", e);
                }
            }
            alert(vars.submit ? "지원서가 제출되었습니다!" : "임시 저장되었습니다!");
            if (vars.submit) navigate(ROUTES.MYPAGE);
        },
        onError: (e) => {
            console.error(e);
            alert("저장 중 오류가 발생했습니다.");
        }
    });

    const handleTempSave = () => {
        if (applyMutation.isPending) return;
        if (formData.answers.length === 0) {
            alert("하나 이상의 질문에 답변을 작성해야 임시 저장할 수 있어요.");
            return;
        }
        applyMutation.mutate({ submit: false });
    };
    const handleSubmit = () => {
        if (applyMutation.isPending) return;
        const msg = validateBeforeSubmit();
        if (msg) {
            alert(msg);
            return;
        }
        applyMutation.mutate({ submit: true });
    };

    return (
        <div
            className={`w-full flex flex-col bg-[#1B1B1B] ${step === 1 ? "min-h-screen" : "min-h-screen"}`}
        >
            <RecruitFormHeader
                isManeger={isManeger}
                onNext={handleNext}
                onPrev={handlePrev}
                isValid={isValid}
                onTempSave={handleTempSave}
                onSubmit={handleSubmit}
                step={step}
                preview={isPreview}
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
                        readOnly={isPreview}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
};
