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

export const AdminUserRecruitPage = () => {
    const queryClient = useQueryClient();
    const { setManageMode } = useRecruitManageStore();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [updateMode, setUpdateMode] = useState<UpdateMode>("");

    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState({
        result: "",
        part: ""
    });

    const {
        data: userRecruitRes,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["submittedApplications", filters.part, filters.result, currentPage],
        queryFn: () =>
            getSubmittedApplications({
                recId: 1, // 교체
                page: currentPage - 1,
                part: filters.part,
                status: filters.result
            })
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

    const handleResult = (status: "FINAL_PASS" | "FAILED" | "PAPER_PASS") => {
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

    useEffect(() => {
        setManageMode(false);
        setUpdateMode("");
    }, [setManageMode]);

    return (
        <AdminLayout>
            <div className="mt-12 mb-8">
                <RecruitUserSearchTool
                    onSearch={handleSearch}
                    onChangeResult={handleResult}
                    updateMode={updateMode}
                />
            </div>
            {isLoading || isError || userRecruitRes.content.length === 0 ? (
                <AdminRecruitSkeleton isLoading={isLoading} isManager={false} />
            ) : (
                <>
                    <RecruitUserSearchList
                        data={userRecruitRes.content}
                        totalElements={userRecruitRes.totalElements}
                        selectedIds={selectedIds}
                        updateMode={updateMode}
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
        </AdminLayout>
    );
};
