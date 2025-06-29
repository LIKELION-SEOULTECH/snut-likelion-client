import AdminLayout from "@/layouts/AdminLayout";
import { NoticeSearchList } from "@/components/admin/notice/NoticeSearchList";
import { NoticeSearchTool } from "@/components/admin/notice/NoticeSearchTool";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllNotices } from "@/apis/notice";
import { deleteNotice } from "@/apis/notice";
import { Pagination } from "@/components/common/Pagination";
// import { dummyNoticeData } from "@/constants/admin/dummyNoticeData";
import { useQueryClient } from "@tanstack/react-query"; // ✅ 캐시 무효화용

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

export const AdminNoticePage = () => {
    const queryClient = useQueryClient(); // 캐시 무효화 객체

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지에 보여줄 개수
    const [filters, setFilters] = useState({
        keyword: ""
    });

    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { data = [] } = useQuery({
        queryKey: ["notices"],
        queryFn: fetchAllNotices
    });

    const filteredData = data.filter(
        (notice) => filters.keyword.trim() === "" || notice.title.includes(filters.keyword)
    );

    // const filteredData = dummyNoticeData.filter(
    //     (notice) => filters.keyword.trim() === "" || notice.writer.includes(filters.keyword)
    // );

    // 현재 페이지에 해당하는 데이터
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentPageData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (newFilters: typeof filters) => {
        setFilters(newFilters);
        setCurrentPage(1); // 검색하면 첫 페이지로 이동
    };

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleToggleSelectAll = (checked: boolean) => {
        if (checked) {
            // 전체 선택
            const allIds = currentPageData.map((item) => item.noticeId);
            setSelectedIds(allIds);
        } else {
            // 전체 해제
            setSelectedIds([]);
        }
    };

    const handleClickDelete = () => {
        if (showCheckboxes) {
            if (selectedIds.length === 0) {
                alert("삭제할 항목을 선택해주세요.");
                return;
            }
            setShowDeleteConfirm(true); // ✅ 모달 띄우기
        } else {
            setShowCheckboxes(true); // 삭제 모드 진입
        }
    };

    const handleConfirmDelete = async () => {
        try {
            console.log("삭제 시작");
            // 여러 개 삭제
            await Promise.all(selectedIds.map((id) => deleteNotice(id)));

            alert("삭제가 완료되었습니다.");

            // 상태 초기화
            setShowDeleteConfirm(false);
            setSelectedIds([]);
            setShowCheckboxes(false);

            // 공지사항 목록 다시 불러오기
            queryClient.invalidateQueries({ queryKey: ["notices"] });
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
            alert("삭제에 실패했습니다.");
        }
    }; // delete 수정 필요

    return (
        <AdminLayout onToggleDeleteMode={handleClickDelete} isDeleteMode={showCheckboxes}>
            <div className="mt-12 mb-7">
                <NoticeSearchTool onSearch={handleSearch} />
            </div>
            <NoticeSearchList
                data={currentPageData}
                showCheckboxes={showCheckboxes}
                selectedIds={selectedIds}
                onToggleSelect={toggleSelect}
                onToggleSelectAll={handleToggleSelectAll}
            />
            <div className="mb-[210px]">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
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
