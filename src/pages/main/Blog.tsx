import { useState, useMemo } from "react";
import BlogTypeTabs from "@/components/blog/BlogTypeTabs";
import PageLayout from "@/layouts/PageLayout";
import { BlogCardList } from "@/components/blog/BlogCardList";
import { Pagination } from "@/components/common/Pagination";
import QuoteCardList from "@/components/project/QuoteCardList";
import { getBlogList } from "@/apis/main/blog";
import { MainSearchBar } from "@/components/common/MainSearchBar";
import { ProjectBoxSkeleton } from "@/components/project/ProjectBoxSkeleton";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

type BlogType = "세션 이야기" | "아기사자 이야기";

export const BlogPage = () => {
    const [blogType, setBlogType] = useState<BlogType>("세션 이야기");
    const [page, setPage] = useState(1);

    const category = useMemo(() => {
        return blogType === "세션 이야기" ? "OFFICIAL" : "UNOFFICIAL";
    }, [blogType]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["blogList", category, page],
        queryFn: () => getBlogList(category, page - 1, 12),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5
    });

    const blogs = data?.content || [];
    const totalPages = data?.totalPages || 1;

    const handleTabSelect = (type: BlogType) => {
        setPage(1);
        setBlogType(type);
    };

    return (
        <PageLayout white={true}>
            <div className="w-full flex flex-col text-[#1b1b1b] items-center px-28 bg-white">
                <div className="font-extrabold text-7xl h-[86px] mt-[86px] mb-[73px]">
                    Blog<span className="text-[#FF7700]">.</span>
                </div>
                <BlogTypeTabs selected={blogType} onSelect={handleTabSelect} />
                {isLoading ? (
                    <div className=" grid grid-cols-3 gap-4 mt-12 w-[1217px]">
                        {Array.from({ length: 9 }).map((_, idx) => (
                            <ProjectBoxSkeleton key={`skeleton-${idx}`} />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-red-500">블로그를 불러오는데 실패했습니다.</div>
                ) : (
                    <BlogCardList blogs={blogs} />
                )}
                <div className="mt-7 w-full">
                    <MainSearchBar />
                </div>
                <div>
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            </div>
            <div className="w-full h-[150px] px-28  mt-[252px]">
                <QuoteCardList />
            </div>
        </PageLayout>
    );
};
