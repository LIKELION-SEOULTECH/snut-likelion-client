import AdminLayout from "@/layouts/AdminLayout";
import { useState, useEffect } from "react";
import { Pagination } from "@/components/common/Pagination";
import { RecruitUserSearchTool } from "@/components/admin/recruit/RecruitUserSearchTool";
import { RecruitUserSearchList } from "@/components/admin/recruit/RecruitUserSearchList";
import { getSubmittedApplications, updateApplicationStatus } from "@/apis/admin/recruitment";
import { useRecruitManageStore } from "@/stores/useRecruitManageStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminRecruitSkeleton } from "@/components/admin/recruit/RecruitSkeleton";
import type { ApplicationData } from "@/types/recruitment";
import type { UpdateMode } from "./AdminManagerRecruit";
import { ApplicationSaveModal } from "@/components/admin/recruit/ApplicationSaveModal";
import { toast, Toaster } from "sonner";
import { CircleCheck } from "lucide-react";
import { fetchRecentRecruitment } from "@/apis/main/recruitment";

export const AdminUserRecruitPage = () => {
    const queryClient = useQueryClient();
    const { setManageMode } = useRecruitManageStore();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [updateMode, setUpdateMode] = useState<UpdateMode>("");

    const [currentPage, setCurrentPage] = useState(1);

    const [saveModal, setSaveModal] = useState(false);

    const [pendingStatusMap, setPendingStatusMap] = useState<
        Record<number, "SUBMITTED" | "PAPER_PASS" | "FINAL_PASS" | "FAILED">
    >({});
    const [filters, setFilters] = useState({
        result: "",
        part: ""
    });
    const hasPendingChanges = Object.keys(pendingStatusMap).length > 0;

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

    const selectableIds =
        userRecruitRes?.content
            .filter((app: ApplicationData) =>
                updateMode === "제출" ? app.status === "제출" : app.status === "서류 합격"
            )
            .map((app: ApplicationData) => app.id) ?? [];

    const isAllSelected =
        selectableIds.length > 0 && selectableIds.every((id: number) => selectedIds.includes(id));

    const toggleSelectAll = () => {
        setSelectedIds((prev) =>
            isAllSelected
                ? prev.filter((id) => !selectableIds.includes(id))
                : Array.from(new Set([...prev, ...selectableIds]))
        );
    };

    const handleSelectItem = (app: ApplicationData) => {
        if (!updateMode) {
            if (app.status === "제출") setUpdateMode("제출");
            else if (app.status === "서류 합격") setUpdateMode("서류 합격");
            else return;
        }

        toggleSelect(app.id);
    };

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const clearSelection = () => setSelectedIds([]);

    const applicationResultMutation = useMutation({
        mutationFn: updateApplicationStatus,
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
            setPendingStatusMap({});
            setSelectedIds([]);
            clearSelection();
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
        const entries = Object.entries(pendingStatusMap);

        if (entries.length === 0) {
            alert("변경된 항목이 없습니다.");
            return;
        }

        const ids = entries.map(([id]) => Number(id));
        const status = entries[0][1];

        applicationResultMutation.mutate({
            status,
            ids
        });
    };

    const handleResult = (status: "FINAL_PASS" | "FAILED" | "PAPER_PASS") => {
        if (selectedIds.length === 0) {
            alert("선택된 지원자가 없습니다.");
            return;
        }

        setPendingStatusMap((prev) => {
            const next = { ...prev };
            selectedIds.forEach((id) => {
                next[id] = status;
            });
            return next;
        });
    };

    useEffect(() => {
        setManageMode(false);
        setUpdateMode("");
    }, [setManageMode]);

    return (
        <AdminLayout
            onSubmit={() => {
                if (hasPendingChanges) {
                    setSaveModal(true);
                } else {
                    alert("변경된 사항이 없습니다.");
                    setManageMode(false);
                }
            }}
        >
            <Toaster position="top-center" offset={{ top: 120, left: 80 }} />
            <div className="mt-12 mb-8">
                <RecruitUserSearchTool
                    onSearch={handleSearch}
                    onChangeResult={handleResult}
                    updateMode={updateMode}
                />
            </div>
            {!recId || isLoading || isError || userRecruitRes.content.length === 0 ? (
                <AdminRecruitSkeleton isLoading={isLoading} isManager={false} />
            ) : (
                <>
                    <RecruitUserSearchList
                        data={userRecruitRes.content}
                        totalElements={userRecruitRes.totalElements}
                        selectedIds={selectedIds}
                        updateMode={updateMode}
                        pendingStatusMap={pendingStatusMap}
                        onToggleSelect={handleSelectItem}
                        onToggleSelectAll={toggleSelectAll}
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
                onConfirm={handleSaveResult}
                status={updateMode === "제출" ? "서류 합격" : "최종 합격"}
            />
        </AdminLayout>
    );
};
