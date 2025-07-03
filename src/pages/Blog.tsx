import { useState, useEffect } from "react";
import BlogTypeTabs from "@/components/blog/BlogTypeTabs";
import PageLayout from "@/layouts/PageLayout";
import { BlogCardList } from "@/components/blog/BlogCardList";
import { Pagination } from "@/components/common/Pagination";
import QuoteCardList from "@/components/project/QuoteCardList";
import { getBlogList } from "@/apis/blog";
import type { Blog } from "@/apis/blog";

type BlogType = "세션 이야기" | "프로젝트 회고";

export const BlogPage = () => {
    const [blogType, setBlogType] = useState<BlogType>("세션 이야기");
    const [page, setPage] = useState(1);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const category: "OFFICIAL" | "UNOFFICIAL" =
            blogType === "세션 이야기" ? "OFFICIAL" : "UNOFFICIAL";
        console.log("📌 blogType 변경:", blogType);

        const fetchBlogs = async (page: number, category: "OFFICIAL" | "UNOFFICIAL") => {
            try {
                const data = await getBlogList({
                    page: page - 1, // 페이지는 0부터 시작 (백엔드 기준)
                    size: 12,
                    category
                });
                console.log("✅ API 응답:", data);
                setBlogs(data.content); // content만 저장
                setTotalPages(data.totalPages); // 전체 페이지 수도 저장
            } catch (error) {
                console.error("블로그 목록 불러오기 실패:", error);
            }
        };

        fetchBlogs(page, category); // ✅ 인자를 객체로 구성해서 넘기기
    }, [blogType, page]); // ✅ page도 의존성에 추가

    const handleTabSelect = (type: BlogType) => {
        setPage(1);
        setBlogType((prev) => (prev === type ? "세션 이야기" : type));
    };

    return (
        <PageLayout white={true}>
            <div className="w-full flex flex-col text-[#1b1b1b] items-center px-28 bg-white">
                <div className="font-extrabold text-7xl h-[86px] mt-[86px] mb-[73px]">
                    Blog<span className="text-[#FF7700]">.</span>
                </div>
                <BlogTypeTabs selected={blogType} onSelect={handleTabSelect} />
                <BlogCardList blogs={Array.isArray(blogs) ? blogs : []} />
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
