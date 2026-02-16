import AdminLayout from "@/layouts/AdminLayout";

import { useState, useEffect } from "react";
import { Pagination } from "@/components/common/Pagination";
import { RecruitManagerSearchTool } from "@/components/admin/recruit/RecruitManagerSearchTool";
import { RecruitManagerSearchList } from "@/components/admin/recruit/RecruitManagerSearchList";

import { getSubmittedApplications, updateApplicationStatus } from "@/apis/admin/recruitment";
import { useRecruitManageStore } from "@/stores/useRecruitManageStore";
import { AdminRecruitSkeleton } from "@/components/admin/recruit/RecruitSkeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApplicationData, ApplicationStatus } from "@/types/recruitment";
import { toast, Toaster } from "sonner";
import { CircleCheck } from "lucide-react";
import { ApplicationSaveModal } from "@/components/admin/recruit/ApplicationSaveModal";
import { fetchRecentRecruitment } from "@/apis/main/recruitment";
import { useManagerPassStore } from "@/stores/useManagerPassStore";

export const AdminManagerRecruitPage = () => {
    const queryClient = useQueryClient();
    const { setManageMode } = useRecruitManageStore();
    const { passIds, baseStatus, clear } = useManagerPassStore();

    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [saveModal, setSaveModal] = useState(false);

    const [filters, setFilters] = useState({
        result: "",
        department: "",
        part: ""
    });

    const { data: recentRecruitment } = useQuery({
        queryKey: ["recentRecruitment", "MANAGER"],
        queryFn: () => fetchRecentRecruitment("MANAGER")
    });

    const recId = recentRecruitment?.data.id;

    const {
        data: managerRecruitRes,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["submittedApplications", recId, filters.part, filters.result, currentPage],
        queryFn: () =>
            getSubmittedApplications({
                recId: recId!,
                page: currentPage - 1,
                part: filters.part,
                department: filters.department,
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
        if (!managerRecruitRes) return;

        setCheckedIds(managerRecruitRes.content.map((app: ApplicationData) => app.id));
    };

    const applicationResultMutation = useMutation({
        mutationFn: updateApplicationStatus,
        onSuccess: () => {
            toast(
                <div className="flex items-center gap-2">
                    <CircleCheck size={20} className="text-green-400" />
                    <span className="text-sm font-medium">합격자가 저장되었습니다</span>
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
            setSaveModal(false);
            setManageMode(false);
            setCheckedIds([]);
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

        applicationResultMutation.mutate({
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
                <RecruitManagerSearchTool
                    onSearch={handleSearch}
                    checkedItemsOnPage={
                        managerRecruitRes?.content
                            ?.filter((app: ApplicationData) => checkedIds.includes(app.id))
                            .map((app: ApplicationData) => ({
                                id: app.id,
                                status: app.status as ApplicationStatus
                            })) ?? []
                    }
                />
            </div>
            {!recId || isLoading || isError || managerRecruitRes.content.length === 0 ? (
                <AdminRecruitSkeleton isLoading={isLoading} isManager={true} />
            ) : (
                <>
                    <RecruitManagerSearchList
                        data={managerRecruitRes.content.map((app: ApplicationData) => ({
                            ...app,
                            displayStatus: getDisplayStatus(app)
                        }))}
                        totalElements={managerRecruitRes.totalElements}
                        finalPassCount={managerRecruitRes.finalPassCount}
                        checkedIds={checkedIds}
                        onToggleSelect={handleSelectItem}
                        onToggleSelectAll={handleToggleAll}
                    />
                    <div className="mb-[210px]">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={managerRecruitRes.totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </>
            )}
            <ApplicationSaveModal
                open={saveModal}
                onClose={() => setSaveModal(false)}
                onConfirm={handleSaveResult}
                status={baseStatus === "서류 합격" ? "최종 합격" : "서류 합격"}
            />
        </AdminLayout>
    );
};
