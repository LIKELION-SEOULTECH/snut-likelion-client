import AdminLayout from "@/layouts/AdminLayout";
import { useState } from "react";
import { Pagination } from "@/components/common/Pagination";
import { dummyUserData } from "@/constants/admin/dummyUserData";
import { RecruitUserSearchTool } from "@/components/admin/recruit/RecruitUserSearchTool";
import { RecruitUserSearchList } from "@/components/admin/recruit/RecruitUserSearchList";

export const AdminUserRecruitPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지에 보여줄 개수
    const [filters, setFilters] = useState({
        part: ""
    });
    const handleSearch = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    // 필터링된 데이터
    const filteredData = dummyUserData.filter(
        (member) => filters.part === "" || member.part === filters.part
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
                <RecruitUserSearchTool onSearch={handleSearch} />
            </div>
            <RecruitUserSearchList data={currentPageData} />
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
