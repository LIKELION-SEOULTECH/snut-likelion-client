import AdminLayout from "@/layouts/AdminLayout";
import { BlogSearchList } from "@/components/admin/blog/BlogSearchList";
import { NoticeSearchTool } from "@/components/admin/notice/NoticeSearchTool";
import { useState } from "react";
import { Pagination } from "@/components/common/Pagination";
import { useQuery } from "@tanstack/react-query";

import { BlogDeleteConfirmDialog } from "@/components/admin/blog/BlogDeleteConfirmDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminBlogList } from "@/apis/admin/blog";
import { deleteAdminBlogs } from "@/apis/admin/blog";
import { AdminBlogSkeleton } from "@/components/admin/blog/BlogSkeleton";
import type { AdminBlog } from "@/types/blog";

export const AdminBlogPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [, setFilters] = useState<{ keyword: string }>({
        keyword: ""
    });

    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const queryClient = useQueryClient();

    const {
        data: blogsRes,
        isLoading: isLoading,
        isError: isError
    } = useQuery({
        queryKey: ["blogs"],
        queryFn: () => getAdminBlogList()
    });

    const { mutate: deleteSelectedBlogs } = useMutation({
        mutationFn: deleteAdminBlogs,
        onSuccess: () => {
            alert("삭제가 완료되었습니다.");
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            setShowDeleteConfirm(false);
            setSelectedIds([]);
            setIsDeleteMode(false);
        },
        onError: () => {
            alert("삭제에 실패했습니다.");
        }
    });

    const handleSearch = (filters: { keyword: string }) => {
        setFilters(filters);
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
            const allIds = blogsRes.content.map((item: AdminBlog) => item.id);
            setSelectedIds(allIds);
        } else {
            // 전체 해제
            setSelectedIds([]);
        }
    };

    const handleClickDelete = () => {
        if (isDeleteMode) {
            if (selectedIds.length === 0) {
                alert("삭제할 항목을 선택해주세요.");
                return;
            }
            setShowDeleteConfirm(true);
        } else {
            setIsDeleteMode(true); // 삭제 모드 진입
        }
    };

    const handleDeleteConfirm = () => {
        console.log("삭제 시도:", selectedIds);
        deleteSelectedBlogs(selectedIds);
    };

    console.log("blog res", blogsRes);
    return (
        <AdminLayout onToggleDeleteMode={handleClickDelete} isDeleteMode={isDeleteMode}>
            {!isDeleteMode && (
                <div className="mt-12">
                    <NoticeSearchTool onSearch={handleSearch} />
                </div>
            )}
            <div className="mt-8">
                {isLoading || isError || blogsRes.content?.length === 0 ? (
                    <AdminBlogSkeleton isLoading={isLoading} />
                ) : (
                    blogsRes.content.length > 0 && (
                        <>
                            <BlogSearchList
                                blogs={blogsRes.content}
                                showCheckboxes={isDeleteMode}
                                selectedIds={selectedIds}
                                totalElements={blogsRes.totalElements}
                                onToggleSelect={toggleSelect}
                                onToggleSelectAll={handleToggleSelectAll}
                            />
                            <div className="mb-[210px]">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={blogsRes.totalPages}
                                    onPageChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </>
                    )
                )}
            </div>
            {showDeleteConfirm && (
                <BlogDeleteConfirmDialog
                    open={showDeleteConfirm}
                    onClose={() => setShowDeleteConfirm(false)}
                    onDelete={handleDeleteConfirm}
                />
            )}
        </AdminLayout>
    );
};
