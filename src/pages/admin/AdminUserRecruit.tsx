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

export const AdminUserRecruitPage = () => {
    const queryClient = useQueryClient();
    const { setManageMode } = useRecruitManageStore();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

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
                recId: 1,
                page: currentPage - 1,
                part: filters.part,
                status: filters.result
            })
    });

    const pageIds = userRecruitRes?.content.map((app: ApplicationData) => app.id) ?? [];

    const isAllSelected =
        pageIds.length > 0 && pageIds.every((id: number) => selectedIds.includes(id));

    const toggleSelectAll = () => {
        setSelectedIds((prev) =>
            isAllSelected
                ? prev.filter((id) => !pageIds.includes(id))
                : Array.from(new Set([...prev, ...pageIds]))
        );
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

    const handleResult = (status: "FINAL_PASS" | "FAIL" | "PAPER_PASS") => {
        if (selectedIds.length === 0) {
            alert("선택된 지원자가 없습니다.");
            return;
        }

        applicationResultMutation.mutate({
            status,
            ids: selectedIds
        });
    };

    useEffect(() => {
        setManageMode(false);
    }, [setManageMode]);

    console.log(userRecruitRes);
    return (
        <AdminLayout>
            <div className="mt-12 mb-8">
                <RecruitUserSearchTool onSearch={handleSearch} onChangeResult={handleResult} />
            </div>
            {isLoading || isError || userRecruitRes.content.length === 0 ? (
                <AdminRecruitSkeleton isLoading={isLoading} isManager={false} />
            ) : (
                <>
                    <RecruitUserSearchList
                        data={userRecruitRes.content}
                        totalElements={userRecruitRes.totalElements}
                        selectedIds={selectedIds}
                        onToggleSelect={toggleSelect}
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
