import AdminLayout from "@/layouts/AdminLayout";

import { useState } from "react";
import { Pagination } from "@/components/common/Pagination";
import { dummyManagerData } from "@/constants/admin/dummyManagerData";
import { RecruitManagerSearchTool } from "@/components/admin/recruit/RecruitManagerSearchTool";
import { RecruitManagerSearchList } from "@/components/admin/recruit/RecruitManagerSearchList";

export const AdminManagerRecruitPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지에 보여줄 개수
    const [filters, setFilters] = useState({
        department: "",
        part: ""
    });

    const handleSearch = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    // 필터링된 데이터
    const filteredData = dummyManagerData.filter(
        (manager) =>
            (filters.department === "" || manager.department === filters.department) &&
            (filters.part === "" || manager.part === filters.part)
    );

    // 현재 페이지에 해당하는 데이터
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentPageData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <AdminLayout>
            <div className="mt-12 mb-7">
                <RecruitManagerSearchTool onSearch={handleSearch} />
            </div>
            <RecruitManagerSearchList data={currentPageData} />
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
