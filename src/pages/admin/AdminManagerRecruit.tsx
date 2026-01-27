import AdminLayout from "@/layouts/AdminLayout";

import { useState, useEffect } from "react";
import { Pagination } from "@/components/common/Pagination";
import { RecruitManagerSearchTool } from "@/components/admin/recruit/RecruitManagerSearchTool";
import { RecruitManagerSearchList } from "@/components/admin/recruit/RecruitManagerSearchList";

import { getSubmittedApplications, updateApplicationStatus } from "@/apis/admin/recruitment";
import { useRecruitManageStore } from "@/stores/useRecruitManageStore";
import { AdminRecruitSkeleton } from "@/components/admin/recruit/RecruitSkeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApplicationData } from "@/types/recruitment";
export type UpdateMode = "제출" | "서류 합격" | "";

export const AdminManagerRecruitPage = () => {
    const queryClient = useQueryClient();
    const { setManageMode } = useRecruitManageStore();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [updateMode, setUpdateMode] = useState<UpdateMode>("");

    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState({
        result: "",
        department: "",
        part: ""
    });

    useEffect(() => {
        setManageMode(false);
        setUpdateMode("");
    }, [setManageMode]);

    const {
        data: managerRecruitRes,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["submittedApplications", filters.part, filters.result, currentPage],
        queryFn: () =>
            getSubmittedApplications({
                recId: 2, // 교체
                page: currentPage - 1,
                part: filters.part,
                department: filters.department,
                status: filters.result
            })
    });

    const selectableIds =
        managerRecruitRes?.content
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
            console.log("지원서 상태 변경 성공");
            clearSelection();
            queryClient.invalidateQueries({
                queryKey: ["submittedApplications"]
            });
        },
        onError: () => {
            alert("결과 변경 실패");
        }
    });

    const handleSearch = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    const handleResult = (status: "FINAL_PASS" | "PAPER_PASS") => {
        if (selectedIds.length === 0) {
            alert("선택된 지원자가 없습니다.");
            return;
        }

        console.log("변경 상태", status);
        applicationResultMutation.mutate({
            status,
            ids: selectedIds
        });
    };

    return (
        <AdminLayout>
            <div className="mt-12 mb-8">
                <RecruitManagerSearchTool
                    onSearch={handleSearch}
                    onChangeResult={handleResult}
                    updateMode={updateMode}
                />
            </div>
            {isLoading || isError || managerRecruitRes.content.length === 0 ? (
                <AdminRecruitSkeleton isLoading={isLoading} isManager={true} />
            ) : (
                <>
                    <RecruitManagerSearchList
                        data={managerRecruitRes.content}
                        totalElements={managerRecruitRes.totalElements}
                        selectedIds={selectedIds}
                        updateMode={updateMode}
                        onToggleSelect={handleSelectItem}
                        onToggleSelectAll={toggleSelectAll}
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
        </AdminLayout>
    );
};
