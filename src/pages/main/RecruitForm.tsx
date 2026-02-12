import { useEffect, useState } from "react";
import { RecruitFormStep1 } from "@/components/recruitment/RecruitFormStep1";
import { RecruitFormStep2 } from "@/components/recruitment/RecruitFormStep2";
import { RecruitFormHeader } from "@/components/recruitment/RecruitFormHeader";
import { Footer } from "@/layouts/Footer";
import { useRecruitmentSchedule, useQuestions } from "@/hooks/useRecruitment";
import { fetchMyApplications, patchApplication, postApplication } from "@/apis/main/recruitment";
import { ROUTES } from "@/routes/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";
import { useMutation } from "@tanstack/react-query";

interface RecruitFormProps {
    isManeger: boolean;
}
export interface FormDataType {
    part: string;
    departmentType: string;
    portfolio: string | null;
    answers: { questionId: number; answer: string }[];
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
        portfolio: "",
        answers: [] as { questionId: number; answer: string }[]
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState<string | undefined>(undefined);
    const [onModalConfirm, setOnModalConfirm] = useState<(() => void) | undefined>(undefined);
    const [modalConfirmText, setModalConfirmText] = useState<string | undefined>(undefined);
    const [modalCancelText, setModalCancelText] = useState<string | undefined>(undefined);

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
            portfolio: app.portfolio ?? "",
            answers: mappedAnswers
        }));

        setStep(navState.step ?? 2);
    }, [navState]);

    const validateBeforeSubmit = () => {
        if (isManeger && !formData.departmentType) return "부서를 선택해주세요.";

        const hasEmptyAnswer = formData.answers.length !== questions?.length;
        if (formData.answers.length === 0 || hasEmptyAnswer)
            return "모든 질문에 답변을 작성해주세요.";

        return null;
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalTitle("");
        setModalDescription(undefined);
        setOnModalConfirm(undefined);
        setModalConfirmText(undefined);
        setModalCancelText(undefined);
    };

    const openModal = (
        title: string,
        description?: string,
        onConfirm?: () => void,
        confirmText?: string,
        cancelText?: string
    ) => {
        setModalTitle(title);
        setModalDescription(description);
        setOnModalConfirm(() => onConfirm);
        setModalConfirmText(confirmText);
        setModalCancelText(cancelText);
        setIsModalOpen(true);
    };

    const openLeaveModal = () => {
        openModal(
            "작성 취소",
            "지원서 작성을 취소하시겠습니까?",
            () => {
                const target = isManeger ? "/recruitments/manager" : "/recruitments/member";
                navigate(target);
                closeModal();
            },
            "예",
            "아니요"
        );
    };

    const openValidationFailModal = (message: string) => {
        openModal(message, undefined, closeModal, "확인");
    };

    const applyMutation = useMutation({
        mutationFn: ({ submit }: { submit: boolean }) => {
            const payload = {
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
            if (e.message.includes("409")) {
                alert("이미 제출된 지원서가 있습니다.");
                navigate(ROUTES.MYPAGE);
                return;
            }
            if (e.message.includes("401")) {
                console.error(e);
                alert("로그인 후 이용해주세요.");
                navigate(ROUTES.LOGIN);
                return;
            }
            alert("지원서 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            console.error(e);
        }
    });

    const handleTempSave = () => {
        if (applyMutation.isPending) return;

        if (formData.answers.length === 0) {
            alert("하나 이상의 질문에 답변을 작성해야 임시 저장할 수 있어요.");
            return;
        }
        openModal(
            "임시저장",
            "지원서가 저장되었습니다",
            () => {
                applyMutation.mutate({ submit: false });
                closeModal();
            },
            "확인",
            undefined
        );
        applyMutation.mutate({ submit: false });
    };

    const handleSubmit = () => {
        if (applyMutation.isPending) return;

        const msg = validateBeforeSubmit();
        if (msg) {
            alert(msg);
            return;
        }

        openModal(
            "지원서를 제출하면 이후 수정이 불가합니다.",
            undefined,
            () => {
                applyMutation.mutate({ submit: true });
                closeModal();
            },
            "지원하기",
            "취소"
        );
    };

    const handleValidationFailForHeader = (message: string) => {
        openValidationFailModal(message);
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
                onHandleLeave={openLeaveModal}
                onValidationFail={handleValidationFailForHeader}
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

            <ConfirmationModal
                open={isModalOpen}
                onClose={closeModal}
                onConfirm={onModalConfirm}
                title={modalTitle}
                description={modalDescription}
                confirmButtonText={modalConfirmText}
                cancelButtonText={modalCancelText}
            />
        </div>
    );
};
