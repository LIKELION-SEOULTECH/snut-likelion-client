import AdminLayout from "@/layouts/AdminLayout";

import { useState, useEffect } from "react";
import { Pagination } from "@/components/common/Pagination";
import { RecruitManagerSearchTool } from "@/components/admin/recruit/RecruitManagerSearchTool";
import { RecruitManagerSearchList } from "@/components/admin/recruit/RecruitManagerSearchList";

import { getSubmittedApplications } from "@/apis/admin/recruitment";
import { useRecruitManageStore } from "@/stores/useRecruitManageStore";
import { AdminRecruitSkeleton } from "@/components/admin/recruit/RecruitSkeleton";
import { useQuery } from "@tanstack/react-query";

export const AdminManagerRecruitPage = () => {
    const { setManageMode } = useRecruitManageStore();
    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState({
        result: "",
        department: "",
        part: ""
    });

    useEffect(() => {
        setManageMode(false);
    }, [setManageMode]);

    const handleSearch = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    const {
        data: managerRecruitRes,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["submittedApplications", filters.part, filters.result, currentPage],
        queryFn: () =>
            getSubmittedApplications({
                recId: 1,
                page: currentPage - 1,
                part: filters.part,
                department: filters.department,
                status: filters.result
            })
    });

    return (
        <AdminLayout>
            <div className="mt-12 mb-8">
                <RecruitManagerSearchTool onSearch={handleSearch} />
            </div>
            {isLoading || isError || managerRecruitRes.content.length === 0 ? (
                <AdminRecruitSkeleton isLoading={isLoading} isManager={true} />
            ) : (
                <>
                    <RecruitManagerSearchList data={managerRecruitRes.content} />
                    <div className="mb-[210px]">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={managerRecruitRes.totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </>
            )}
        </AdminLayout>
    );
};
