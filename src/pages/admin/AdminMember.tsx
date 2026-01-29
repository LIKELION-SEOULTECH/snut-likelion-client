import AdminLayout from "@/layouts/AdminLayout";
import { MemberSearchList } from "@/components/admin/member/MemberSearchList";
import { MemberSearchTool } from "@/components/admin/member/MemberSearchTool";
import { useState } from "react";
import { Pagination } from "@/components/common/Pagination";

import { useQuery } from "@tanstack/react-query";
import { getAdminMemberSearchList } from "@/apis/admin/member";
import { AdminMemberSkeleton } from "@/components/admin/member/MemberSkeleton";
import type { MemberFilter } from "@/types/member";

export const AdminMemberPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [filters, setFilters] = useState<MemberFilter>({
        generation: null,
        part: "",
        role: "",
        keyword: ""
    });

    const handleSearch = (newFilters: MemberFilter) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const {
        data: membersRes,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["members", filters, currentPage],
        queryFn: async () => {
            const queryParams: {
                generation?: number | null;
                part?: string;
                role?: string;
                keyword?: string;
                page: number;
                size: number;
            } = {
                size: 8,
                page: currentPage - 1
            };

            if (filters.generation !== null) {
                queryParams.generation = filters.generation;
            }
            if (filters.part !== "all") queryParams.part = filters.part;
            if (filters.role !== "all") queryParams.role = filters.role;
            if (filters.keyword.trim() !== "") queryParams.keyword = filters.keyword;

            return getAdminMemberSearchList(queryParams);
        }
    });

    return (
        <AdminLayout>
            <div className="mt-12 mb-8">
                <MemberSearchTool onSearch={handleSearch} />
            </div>
            <div>
                {isLoading || isError || membersRes?.content.length === 0 ? (
                    <>
                        <AdminMemberSkeleton isLoading={isLoading} />
                    </>
                ) : (
                    <>
                        {membersRes && membersRes?.content.length > 0 && (
                            <>
                                <MemberSearchList
                                    members={membersRes.content}
                                    totalElements={membersRes.totalElements}
                                />
                                <div className="mb-[210px]">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={membersRes.totalPages}
                                        onPageChange={(page) => setCurrentPage(page)}
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </AdminLayout>
    );
};
