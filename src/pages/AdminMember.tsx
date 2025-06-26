import AdminLayout from "@/layouts/AdminLayout";
import { MemberSearchList } from "@/components/admin/MemberSearchList";
import { MemberSearchTool } from "@/components/admin/MemberSearchTool";
import { useState } from "react";
import { Pagination } from "@/components/common/Pagination";
import { dummyMemberData } from "@/constants/admin/dummyMemberData";

export const AdminMemberPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지에 보여줄 개수
    const [filters, setFilters] = useState({
        generation: "",
        part: "",
        role: "",
        keyword: ""
    });

    const handleSearch = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    // 필터링된 데이터
    const filteredData = dummyMemberData.filter(
        (member) =>
            (filters.generation === "" || member.generation === filters.generation) &&
            (filters.part === "" || member.part === filters.part) &&
            (filters.role === "" || member.role === filters.role) &&
            member.name.includes(filters.keyword)
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
                <MemberSearchTool onSearch={handleSearch} />
            </div>
            <MemberSearchList data={currentPageData} />
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
