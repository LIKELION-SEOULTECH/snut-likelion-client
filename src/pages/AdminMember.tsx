import AdminLayout from "@/layouts/AdminLayout";
import { MemberSearchList } from "@/components/admin/member/MemberSearchList";
import { MemberSearchTool } from "@/components/admin/member/MemberSearchTool";
import { useState } from "react";
import { Pagination } from "@/components/common/Pagination";
import { fetchMemberList } from "@/apis/member";
import { useQuery } from "@tanstack/react-query";

export const AdminMemberPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지에 보여줄 개수
    const [filters, setFilters] = useState({
        generation: "all",
        part: "all",
        role: "all",
        keyword: ""
    });

    const handleSearch = (newFilters: typeof filters) => {
        setFilters(newFilters);
        setCurrentPage(1); // 필터 변경 시 첫 페이지로 초기화
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["members", filters, currentPage],
        queryFn: async () => {
            const queryParams: {
                generation?: number;
                part?: string;
                role?: string;
                keyword?: string;
                page: number;
                size: number;
            } = {
                page: currentPage - 1,
                size: itemsPerPage
            };

            if (filters.generation !== "all") queryParams.generation = Number(filters.generation);
            if (filters.part !== "all") queryParams.part = filters.part;
            if (filters.role !== "all") queryParams.role = filters.role;
            if (filters.keyword.trim() !== "") queryParams.keyword = filters.keyword;

            return fetchMemberList(queryParams);
        }
    });

    return (
        <AdminLayout>
            <div className="mt-12 mb-7">
                <MemberSearchTool onSearch={handleSearch} />
            </div>
            {isLoading ? (
                <div className="text-center mt-10">불러오는 중...</div>
            ) : isError || !data ? (
                <div className="text-center mt-10 text-red-500">데이터 로딩 실패</div>
            ) : (
                <>
                    <MemberSearchList
                        data={data.content}
                        totalElement={data.totalElements}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                    />
                    <div className="mb-[210px]">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={data.totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </>
            )}
        </AdminLayout>
    );
};
