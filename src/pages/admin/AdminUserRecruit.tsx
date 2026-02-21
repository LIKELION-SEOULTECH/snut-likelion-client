import AdminLayout from "@/layouts/AdminLayout";
import { useState, useEffect } from "react";
import { Pagination } from "@/components/common/Pagination";
import { RecruitUserSearchTool } from "@/components/admin/recruit/RecruitUserSearchTool";
import { RecruitUserSearchList } from "@/components/admin/recruit/RecruitUserSearchList";
import { getSubmittedApplications, updateApplicationStatus } from "@/apis/admin/recruitment";
import { useRecruitManageStore } from "@/stores/useRecruitManageStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminRecruitSkeleton } from "@/components/admin/recruit/RecruitSkeleton";
import type { ApplicationData, ApplicationStatus } from "@/types/recruitment";
import { ApplicationSaveModal } from "@/components/admin/recruit/ApplicationSaveModal";
import { toast, Toaster } from "sonner";
import { CircleCheck } from "lucide-react";
import { fetchRecentRecruitment } from "@/apis/main/recruitment";
import { useMemberPassStore } from "@/stores/useMemberPassStore";

export const AdminUserRecruitPage = () => {
    const queryClient = useQueryClient();
    const { setManageMode } = useRecruitManageStore();
    const { passIds, baseStatus, clear } = useMemberPassStore();

    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [saveModal, setSaveModal] = useState(false);

    const [filters, setFilters] = useState({
        result: "",
        part: ""
    });

    const { data: recentRecruitment } = useQuery({
        queryKey: ["recentRecruitment", "MEMBER"],
        queryFn: () => fetchRecentRecruitment("MEMBER")
    });

    const recId = recentRecruitment?.data?.id;

    const {
        data: userRecruitRes,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["submittedApplications", recId, filters.part, filters.result, currentPage],
        queryFn: () =>
            getSubmittedApplications({
                recId: recId,
                page: currentPage - 1,
                part: filters.part,
                status: filters.result
            }),
        enabled: !!recId
    });

    const handleSelectItem = (app: ApplicationData) => {
        setCheckedIds((prev) =>
            prev.includes(app.id) ? prev.filter((id) => id !== app.id) : [...prev, app.id]
        );
    };

    const handleToggleAll = () => {
        if (!userRecruitRes) return;

        setCheckedIds(userRecruitRes.content.map((app: ApplicationData) => app.id));
    };

    const { mutate: updateStatus, isPending } = useMutation({
        mutationFn: updateApplicationStatus,
        retry: false,
        onSuccess: () => {
            toast(
                <div className="flex items-center gap-2">
                    <CircleCheck size={20} className="text-green-400" />
                    <span className="text-sm font-medium">합격자 저장에 성공하였습니다.</span>
                </div>,
                {
                    unstyled: true,
                    duration: 3000,
                    classNames: {
                        toast: "bg-black/60 shadow-[0px_4px_24px_rgba(0,0,0,0.16)] backdrop-blur-none text-white px-[23px] py-[11.5px] rounded-sm"
                    }
                }
            );
            clear();
            setCheckedIds([]);
            setSaveModal(false);
            setManageMode(false);
            queryClient.invalidateQueries({ queryKey: ["submittedApplications"] });
        },
        onError: () => {
            alert("결과 변경 실패");
        }
    });

    const handleSearch = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    const handleSaveResult = () => {
        if (isPending) return;

        if (passIds.length === 0 || !baseStatus) {
            alert("선택된 지원자가 없습니다.");
            return;
        }

        let nextStatus: ApplicationStatus;

        if (baseStatus === "서류 합격") {
            nextStatus = "FINAL_PASS";
        } else {
            nextStatus = "PAPER_PASS";
        }

        updateStatus({
            recId: recId,
            status: nextStatus,
            ids: passIds
        });
    };

    const getDisplayStatus = (app: ApplicationData) => {
        if (passIds.includes(app.id)) {
            if (baseStatus === "서류 합격") return "FINAL_PASS";
            return "PAPER_PASS";
        }

        return app.status;
    };

    useEffect(() => {
        setManageMode(false);
    }, [setManageMode]);

    return (
        <AdminLayout
            onSubmit={() => {
                if (passIds.length > 0) {
                    setSaveModal(true);
                } else {
                    alert("변경된 사항이 없습니다.");
                }
            }}
        >
            <Toaster position="top-center" offset={{ top: 120, left: 80 }} />
            <div className="mt-12 mb-8">
                <RecruitUserSearchTool
                    onSearch={handleSearch}
                    checkedItemsOnPage={
                        userRecruitRes?.content
                            ?.filter((app: ApplicationData) => checkedIds.includes(app.id))
                            .map((app: ApplicationData) => ({
                                id: app.id,
                                status: app.status as ApplicationStatus
                            })) ?? []
                    }
                />
            </div>
            {!recId || isLoading || isError || userRecruitRes.content.length === 0 ? (
                <AdminRecruitSkeleton isLoading={isLoading} isManager={false} />
            ) : (
                <>
                    <RecruitUserSearchList
                        data={userRecruitRes.content.map((app: ApplicationData) => ({
                            ...app,
                            displayStatus: getDisplayStatus(app)
                        }))}
                        totalElements={userRecruitRes.totalElements}
                        finalPassCount={userRecruitRes.finalPassCount}
                        checkedIds={checkedIds}
                        onToggleSelect={handleSelectItem}
                        onToggleSelectAll={handleToggleAll}
                    />
                    <div className="mb-[210px]">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={userRecruitRes.totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </>
            )}
            <ApplicationSaveModal
                open={saveModal}
                onClose={() => setSaveModal(false)}
                isLoading={isPending}
                onConfirm={handleSaveResult}
                status={baseStatus === "서류 합격" ? "최종 합격" : "서류 합격"}
            />
        </AdminLayout>
    );
};
