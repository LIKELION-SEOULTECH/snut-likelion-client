import { useState } from "react";
// import BlogTypeTabs from "@/components/blog/BlogTypeTabs";
import PageLayout from "@/layouts/PageLayout";
import { BlogCardList } from "@/components/blog/BlogCardList";
import { Pagination } from "@/components/common/Pagination";
import QuoteCardList from "@/components/project/QuoteCardList";
import { getBlogList } from "@/apis/main/blog";
import { MainSearchBar } from "@/components/common/MainSearchBar";
import { ProjectBoxSkeleton } from "@/components/project/ProjectBoxSkeleton";
import { useQueries, keepPreviousData } from "@tanstack/react-query";

// type BlogType = "세션 이야기" | "아기사자 이야기";

export const BlogPage = () => {
    const [page, setPage] = useState(1);
    const pageSize = 12;

    const results = useQueries({
        queries: [
            {
                queryKey: ["blogList", "OFFICIAL"],
                queryFn: () => getBlogList("OFFICIAL", 0, 1000),
                placeholderData: keepPreviousData,
                staleTime: 1000 * 60 * 5
            },
            {
                queryKey: ["blogList", "UNOFFICIAL"],
                queryFn: () => getBlogList("UNOFFICIAL", 0, 1000),
                placeholderData: keepPreviousData,
                staleTime: 1000 * 60 * 5
            }
        ]
    });

    const officialBlogsQueryResult = results[0];
    const unofficialBlogsQueryResult = results[1];

    const isLoading = officialBlogsQueryResult.isLoading || unofficialBlogsQueryResult.isLoading;
    const isError = officialBlogsQueryResult.isError || unofficialBlogsQueryResult.isError;

    const allCombinedBlogs = (officialBlogsQueryResult.data?.content || [])
        .concat(unofficialBlogsQueryResult.data?.content || [])
        .sort((a: { id: number }, b: { id: number }) => {
            return b.id - a.id;
        });

    const totalCombinedBlogsCount = allCombinedBlogs.length;
    const finalTotalPages = Math.ceil(totalCombinedBlogsCount / pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const blogsForCurrentPage = allCombinedBlogs.slice(startIndex, endIndex);

    return (
        <PageLayout white={true}>
            <div className="w-full flex flex-col text-[#1b1b1b] px-28 bg-white">
                <div className="font-extrabold text-7xl h-[86px] mt-[86px] mb-[73px] text-center">
                    Blog<span className="text-[#FF7700]">.</span>
                </div>

                {/* <BlogTypeTabs selected={blogType} onSelect={handleTabSelect} /> */}
                <div className="mt-7 w-[598px] ">
                    <MainSearchBar />
                </div>
                {isLoading ? (
                    <div className=" grid grid-cols-3 gap-4 mt-12 w-[1217px]">
                        {Array.from({ length: 9 }).map((_, idx) => (
                            <ProjectBoxSkeleton key={`skeleton-${idx}`} />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-red-500">블로그를 불러오는데 실패했습니다.</div>
                ) : (
                    <BlogCardList blogs={blogsForCurrentPage} />
                )}

                <div>
                    <Pagination
                        currentPage={page}
                        totalPages={finalTotalPages === 0 ? 1 : finalTotalPages}
                        onPageChange={setPage}
                    />
                </div>
            </div>
            <div className="w-full h-[150px] px-28  mt-[252px]">
                <QuoteCardList />
            </div>
        </PageLayout>
    );
};
