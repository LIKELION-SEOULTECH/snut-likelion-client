import { fetchMyApplications } from "@/apis/main/recruitment";
import { useGuestRecruitNavigation } from "@/hooks/useGuestRecruitNavigation";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export const GuestMyPage = () => {
    const navigate = useNavigate();
    const { goRecruitForm } = useGuestRecruitNavigation();
    const partLabelMap: Record<string, string> = {
        FRONTEND: "프론트엔드",
        BACKEND: "백엔드",
        DESIGN: "디자인",
        AI: "인공지능",
        PLANNING: "기획"
    };

    const deptLabelMap: Record<string, string> = {
        ACADEMIC: "학술부",
        MARKETING: "홍보부",
        OPERATION: "운영부"
    };

    const { data: appsRes, isLoading } = useQuery({
        queryKey: ["myApplications"],
        queryFn: fetchMyApplications,
        staleTime: 1000 * 30
    });

    const hasApplication = !!appsRes?.[0];
    const isSubmitted = appsRes?.[0]?.status === "SUBMITTED";

    const applicationTitle = useMemo(() => {
        if (!appsRes?.[0]) return "";

        const partKo = partLabelMap[appsRes?.[0].part] ?? appsRes?.[0].part ?? "";
        const deptRaw = appsRes?.[0].departmentType;

        const deptKo = deptRaw && deptRaw.trim() !== "" ? (deptLabelMap[deptRaw] ?? deptRaw) : "";

        // departmentType 있으면 운영진, 없으면 아기사자
        if (deptKo) {
            return `[운영진] ${deptKo}/${partKo} 지원서`;
        }
        return `[아기사자] ${partKo} 파트 지원서`;
    }, [appsRes]);

    const goPreview = () => {
        if (!appsRes?.[0]) return;
        navigate("/applications/preview", { state: { application: appsRes?.[0] } });
    };

    const handleGuestRecruit = () => {
        if (hasApplication && isSubmitted) {
            goPreview();
            return;
        }
        if (!appsRes?.[0]) {
            goRecruitForm();
            return;
        }
        const app = appsRes[0];
        const isManagerDraft = !!app.departmentType && app.departmentType.trim() !== "";

        navigate(isManagerDraft ? "/recruitform/manager" : "/recruitform/member", {
            state: {
                mode: "edit",
                step: 2,
                appId: app.id,
                application: app
            }
        });
    };

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex justify-between mb-[29px]">
                <h4 className="text-[32px] text-white font-bold">지원서</h4>
                <span
                    className={`text-[20px] cursor-pointer text-[#f70] ${
                        hasApplication ? "text-[#7F7F7F]" : "text-[#F70]"
                    }`}
                    onClick={handleGuestRecruit}
                >
                    {hasApplication && isSubmitted === false && <span>수정하기</span>}
                    {!hasApplication && !isLoading && <span>지원서 작성하기</span>}
                </span>
            </div>
            <div className="bg-[#404040] h-[98px] py-[35px] px-[40px] cursor-pointer text-[24px] rounded-[12px] text-[#7F7F7F]">
                {hasApplication && isSubmitted && (
                    <span className="py-[10px] px-4 mr-4 bg-[#F70] rounded-[120px] text-[16px] text-white">
                        지원 완료
                    </span>
                )}
                {!hasApplication && !isLoading && <span>아직 작성한 지원서가 없습니다.</span>}
                {hasApplication && !isLoading && (
                    <span className="text-[#ECECEC]">{applicationTitle}</span>
                )}
            </div>
        </div>
    );
};
