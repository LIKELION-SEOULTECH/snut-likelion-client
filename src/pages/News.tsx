import { useState } from "react";
import { mockNewsList } from "@/constants/news/mockNewsList";
import PageLayout from "@/layouts/PageLayout";
import { NewsCardList } from "@/components/news/NewsCardList";
import { Pagination } from "@/components/common/Pagination";

const PAGE_SIZE = 8;

export const NewsPage = () => {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(mockNewsList.length / PAGE_SIZE);

    const paginatedNews = mockNewsList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <PageLayout white={true}>
            <div className="w-full flex flex-col text-[#1b1b1b] items-center px-28 pb-[250px] bg-white">
                <div className="font-extrabold text-7xl h-[86px] mt-[86px] mb-[73px]">
                    News<span className="text-[#FF7700]">.</span>
                </div>
                <div>
                    <NewsCardList newsList={paginatedNews} />
                </div>
                <div>
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            </div>
        </PageLayout>
    );
};
