import { useState } from "react";
import BlogTypeTabs from "@/components/blog/BlogTypeTabs";
import PageLayout from "@/layouts/PageLayout";
import { mockBlogList } from "@/constants/blog/mockBlogList";
import { BlogCardList } from "@/components/blog/BlogCardList";
import { Pagination } from "@/components/common/Pagination";
import QuoteCardList from "@/components/project/QuoteCardList";

type BlogType = "세션 이야기" | "프로젝트 회고" | "전체";

const PAGE_SIZE = 12;

export const BlogPage = () => {
    const [blogType, setBlogType] = useState<BlogType>("전체");
    const [page, setPage] = useState(1);

    const handleTabSelect = (type: BlogType) => {
        setPage(1);
        setBlogType((prev) => (prev === type ? "전체" : type));
    };

    const filteredBlogs =
        blogType === "전체" ? mockBlogList : mockBlogList.filter((blog) => blog.type === blogType);

    const totalPages = Math.ceil(filteredBlogs.length / PAGE_SIZE);

    const paginatedBlogs = filteredBlogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <PageLayout white={true}>
            <div className="w-full flex flex-col text-[#1b1b1b] items-center px-28 bg-white">
                <div className="font-extrabold text-7xl h-[86px] mt-[86px] mb-[73px]">
                    Blog<span className="text-[#FF7700]">.</span>
                </div>
                <BlogTypeTabs selected={blogType} onSelect={handleTabSelect} />
                <BlogCardList blogs={paginatedBlogs} />
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
