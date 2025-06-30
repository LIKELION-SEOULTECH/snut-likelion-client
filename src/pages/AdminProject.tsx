import AdminLayout from "@/layouts/AdminLayout";
import { ProjectSearchList } from "@/components/admin/project/ProjectSearchList";
import { ProjectSearchTool } from "@/components/admin/project/ProjectSearchTool";
import { useState, useEffect } from "react";
import { Pagination } from "@/components/common/Pagination";
import { fetchAllProjects } from "@/apis/project";
import type { Project } from "@/types/project";
import { deleteMultipleProjects } from "@/apis/project";
import { ProjectDeleteConfirmDialog } from "@/components/admin/project/ProjectDeleteConfirmModal";

export const AdminProjectPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const itemsPerPage = 8; // 한 페이지에 보여줄 개수
    const [filters, setFilters] = useState({
        generation: "",
        keyword: ""
    });

    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllProjects(); // ✅ await로 데이터 수신
                setAllProjects(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const filteredData = allProjects.filter(
        (project) =>
            (filters.generation === "" || project.generation === Number(filters.generation)) &&
            (filters.keyword.trim() === "" || project.name.includes(filters.keyword))
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentPageData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (newFilters: { generation: string; keyword: string }) => {
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
            setShowDeleteConfirm(true); // ✅ 모달 띄우기
        } else {
            setShowCheckboxes(true); // 삭제 모드 진입
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteMultipleProjects(selectedIds);

            setAllProjects((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
            setSelectedIds([]);
            setShowDeleteConfirm(false);
            setShowCheckboxes(false);
            alert("삭제가 완료되었습니다.");
        } catch (err) {
            console.error(err);
            alert("삭제에 실패했습니다.");
        }
    };
    return (
        <AdminLayout onToggleDeleteMode={handleClickDelete} isDeleteMode={showCheckboxes}>
            <div className="mt-12 mb-7">
                <ProjectSearchTool onSearch={handleSearch} />
            </div>
            <ProjectSearchList
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
                <ProjectDeleteConfirmDialog
                    open={showDeleteConfirm}
                    onClose={() => setShowDeleteConfirm(false)}
                    onDelete={handleConfirmDelete}
                />
            )}
        </AdminLayout>
    );
};
