import AdminLayout from "@/layouts/AdminLayout";
import { ProjectSearchList } from "@/components/admin/project/ProjectSearchList";
import { ProjectSearchTool } from "@/components/admin/project/ProjectSearchTool";
import { useState } from "react";
import { Pagination } from "@/components/common/Pagination";

import type { Project, ProjectFilter } from "@/types/project";

import { deleteMultipleProjects, getAdminProjects } from "@/apis/admin/project";
import { ProjectDeleteConfirmDialog } from "@/components/admin/project/ProjectDeleteConfirmModal";
import { ProjectDeleteModal } from "@/components/admin/project/ProjectDeleteModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminProjectSkeleton } from "@/components/admin/project/ProjectSkeleton";

export const AdminProjectPage = () => {
    const queryClient = useQueryClient();

    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState<ProjectFilter>({
        generation: null,
        keyword: ""
    });

    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const {
        data: projects,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["adminProjects", filters.generation, filters.keyword, currentPage],
        queryFn: () =>
            getAdminProjects({
                generation: filters.generation,
                keyword: filters.keyword,
                page: currentPage - 1
            })
    });

    const handleSearch = (newFilters: ProjectFilter) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleToggleSelectAll = (checked: boolean) => {
        if (checked) {
            // 전체 선택
            const allIds = projects.content.map((item: Project) => item.id);
            setSelectedIds(allIds);
        } else {
            // 전체 해제
            setSelectedIds([]);
        }
    };

    const deleteProjectsMutation = useMutation({
        mutationFn: (ids: number[]) => deleteMultipleProjects(ids),
        onSuccess: () => {
            setSelectedIds([]);
            setShowDeleteModal(false);
            setShowDeleteConfirm(true);
            setShowCheckboxes(false);

            queryClient.invalidateQueries({
                queryKey: ["adminProjects"]
            });
        },
        onError: () => {
            alert("삭제에 실패했습니다.");
        }
    });

    const handleClickDelete = () => {
        if (showCheckboxes) {
            if (selectedIds.length === 0) {
                alert("삭제할 항목을 선택해주세요.");
                return;
            }
            setShowDeleteModal(true);
        } else {
            setShowCheckboxes(true);
        }
    };
    const handleConfirmDelete = () => {
        deleteProjectsMutation.mutate(selectedIds);
    };

    return (
        <AdminLayout onToggleDeleteMode={handleClickDelete} isDeleteMode={showCheckboxes}>
            <div className="mt-12 mb-8">
                <ProjectSearchTool onSearch={handleSearch} />
            </div>
            <div>
                {isLoading || isError || projects?.content.length === 0 ? (
                    <>
                        <AdminProjectSkeleton isLoading={isLoading} />
                    </>
                ) : (
                    <>
                        {projects && projects?.content.length > 1 && (
                            <>
                                <ProjectSearchList
                                    data={projects}
                                    showCheckboxes={showCheckboxes}
                                    selectedIds={selectedIds}
                                    onToggleSelect={toggleSelect}
                                    onToggleSelectAll={handleToggleSelectAll}
                                    length={projects.content.length}
                                />
                                <div className="mb-[210px]">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={projects.content.length}
                                        onPageChange={(page) => setCurrentPage(page)}
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>

            {showDeleteModal && (
                <ProjectDeleteModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleConfirmDelete}
                />
            )}
            {showDeleteConfirm && (
                <ProjectDeleteConfirmDialog
                    open={showDeleteConfirm}
                    onClose={() => setShowDeleteConfirm(false)}
                />
            )}
        </AdminLayout>
    );
};
