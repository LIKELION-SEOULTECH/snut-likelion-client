import AdminLayout from "@/layouts/AdminLayout";
import { NoticeSearchList } from "@/components/admin/notice/NoticeSearchList";
import { NoticeSearchTool } from "@/components/admin/notice/NoticeSearchTool";
import { useState } from "react";
import { deleteNotice } from "@/apis/main/notice";
import { Pagination } from "@/components/common/Pagination";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

import { getAdminNotices } from "@/apis/admin/notice";
import type { Notice } from "@/types/notice";
import { AdminNoticeSkeleton } from "@/components/admin/notice/NoticeSkeleton";

export const AdminNoticePage = () => {
    const queryClient = useQueryClient();

    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        keyword: ""
    });

    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const {
        data: noticeRes,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["adminNotices", filters.keyword, currentPage],
        queryFn: () =>
            getAdminNotices({
                keyword: filters.keyword,
                page: currentPage - 1
            })
    });

    const deleteMutation = useMutation({
        mutationFn: (ids: number[]) => Promise.all(ids.map((id) => deleteNotice(id))),
        onSuccess: () => {
            alert("삭제가 완료되었습니다.");
            setShowDeleteConfirm(false);
            setSelectedIds([]);
            setIsDeleteMode(false);

            queryClient.invalidateQueries({
                queryKey: ["adminNotices"]
            });
        },
        onError: () => {
            alert("삭제에 실패했습니다.");
        }
    });

    const handleSearch = (newFilters: { keyword: string }) => {
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
            const allIds = noticeRes.content.map((item: Notice) => item.noticeId);
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
            setShowDeleteConfirm(true); // 모달 띄우기
        } else {
            setIsDeleteMode(true); // 삭제 모드 진입
        }
    };

    const handleConfirmDelete = () => {
        deleteMutation.mutate(selectedIds);
    };

    return (
        <AdminLayout onToggleDeleteMode={handleClickDelete} isDeleteMode={isDeleteMode}>
            {!isDeleteMode && (
                <div className="mt-12">
                    <NoticeSearchTool onSearch={handleSearch} />
                </div>
            )}
            <div className="mt-8">
                {isLoading || isError || noticeRes.content.length === 0 ? (
                    <AdminNoticeSkeleton isLoading={isLoading} />
                ) : (
                    noticeRes.content.length > 0 && (
                        <>
                            <NoticeSearchList
                                data={noticeRes.content}
                                selectedIds={selectedIds}
                                onToggleSelect={toggleSelect}
                                onToggleSelectAll={handleToggleSelectAll}
                                length={noticeRes.length}
                            />
                            <div className="mb-[210px]">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={noticeRes.length}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </>
                    )
                )}
            </div>

            {showDeleteConfirm && (
                <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                    <DialogContent className="flex flex-col justify-center w-[390px] p-7 rounded-[8px] gap-2 [&>button.absolute]:hidden">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-center">
                                게시물 삭제
                            </DialogTitle>
                        </DialogHeader>
                        <div className="text-center text-sm font-medium">
                            게시물이 영구적으로 삭제되며, 다시 복구할 수 없습니다.
                        </div>
                        <DialogFooter className="flex h-11 justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                className="flex-1 h-full border border-[#ff7700] text-black rounded-sm"
                            >
                                삭제하기
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 h-full bg-[#FF7700] text-white rounded-sm"
                            >
                                아니요
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </AdminLayout>
    );
};
