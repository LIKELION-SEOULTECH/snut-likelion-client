import AdminLayout from "@/layouts/AdminLayout";
import { BlogSearchList } from "@/components/admin/blog/BlogSearchList";
import { NoticeSearchTool } from "@/components/admin/notice/NoticeSearchTool";
import { useState, useMemo } from "react";
import { Pagination } from "@/components/common/Pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogList } from "@/apis/blog";

import { BlogDeleteConfirmDialog } from "@/components/admin/blog/BlogDeleteConfirmDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminBlogs } from "@/apis/blog";

export const AdminBlogPage = () => {
    // const [blogs, setBlogs] = useState(dummyBlogData);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지에 보여줄 개수
    const [filters, setFilters] = useState({
        keyword: ""
    });

    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { data: official = [] } = useQuery({
        queryKey: ["blogs", "official"],
        queryFn: () => fetchBlogList("OFFICIAL", 0).then((res) => res.data.content)
    });

    const { data: unofficial = [] } = useQuery({
        queryKey: ["blogs", "unofficial"],
        queryFn: () => fetchBlogList("UNOFFICIAL", 0).then((res) => res.data.content)
    });

    const combinedData = useMemo(() => {
        const all = [...official, ...unofficial];
        return all
            .filter((item) => filters.keyword.trim() === "" || item.title.includes(filters.keyword))
            .sort((a, b) => b.id - a.id); // 최신순 정렬
    }, [official, unofficial, filters]);

    const queryClient = useQueryClient();

    const { mutate: deleteSelectedBlogs } = useMutation({
        mutationFn: deleteAdminBlogs,
        onSuccess: () => {
            alert("삭제가 완료되었습니다.");
            queryClient.invalidateQueries({ queryKey: ["blogs", "official"] });
            queryClient.invalidateQueries({ queryKey: ["blogs", "unofficial"] });
            setShowDeleteConfirm(false);
            setSelectedIds([]);
            setShowCheckboxes(false);
        },
        onError: () => {
            alert("삭제에 실패했습니다.");
        }
    });
    // 현재 페이지에 해당하는 데이터
    const totalPages = Math.ceil(combinedData.length / itemsPerPage);
    const currentPageData = combinedData.slice(
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
            const allIds = currentPageData.map((item) => item.id);
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
            setShowDeleteConfirm(true);
        } else {
            setShowCheckboxes(true); // 삭제 모드 진입
        }
    };

    const handleDeleteConfirm = () => {
        console.log("삭제 시도:", selectedIds);
        deleteSelectedBlogs(selectedIds);
    };

    return (
        <AdminLayout onToggleDeleteMode={handleClickDelete} isDeleteMode={showCheckboxes}>
            <div className="mt-12 mb-7">
                <NoticeSearchTool onSearch={handleSearch} />
            </div>
            <BlogSearchList
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
                <BlogDeleteConfirmDialog
                    open={showDeleteConfirm}
                    onClose={() => setShowDeleteConfirm(false)}
                    onDelete={handleDeleteConfirm}
                />
            )}
        </AdminLayout>
    );
};
