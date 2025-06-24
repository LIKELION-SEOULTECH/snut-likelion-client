import AdminLayout from "@/layouts/AdminLayout";
import { ProjectSearchList } from "@/components/admin/project/ProjectSearchList";
import { ProjectSearchTool } from "@/components/admin/project/ProjectSearchTool";
import { useState } from "react";
import { Pagination } from "@/components/common/Pagination";
import { dummyProjectData } from "@/constants/admin/dummyProjectData";

export const AdminProjectPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지에 보여줄 개수
    const [filters, setFilters] = useState({
        generation: "",
        keyword: ""
    });

    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const filteredData = dummyProjectData.filter(
        (project) =>
            (filters.generation === "" || project.gen === filters.generation) &&
            (filters.keyword.trim() === "" || project.title.includes(filters.keyword))
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

    const handleToggleDeleteMode = () => {
        setShowCheckboxes((prev) => !prev);
        setSelectedIds([]); // 삭제모드 초기화
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

    return (
        <AdminLayout onToggleDeleteMode={handleToggleDeleteMode} isDeleteMode={showCheckboxes}>
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
        </AdminLayout>
    );
};
