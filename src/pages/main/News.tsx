import { useState } from "react";
import PageLayout from "@/layouts/PageLayout";
import { NoticeCardList } from "@/components/notice/NoticeCardList";
import { Pagination } from "@/components/common/Pagination";
import QuoteCardList from "@/components/project/QuoteCardList";
import { useNotices } from "@/hooks/useNotice";

const PAGE_SIZE = 8;

interface RawNotice {
    noticeId: number;
    title: string;
    pinned: boolean;
    createdAt: string;
}

export const NewsPage = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useNotices();

    const rawList = data as RawNotice[] | undefined;

    const newsList = Array.isArray(rawList)
        ? rawList.map((item) => ({
              id: item.noticeId,
              type: item.pinned ? "공지" : "뉴스",
              title: item.title,
              date: item.createdAt.split("T")[0],
              isNew: new Date(item.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }))
        : [];

    const totalPages = Math.ceil(newsList.length / PAGE_SIZE);
    const paginatedNews = newsList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <PageLayout white={true}>
            <div className="w-full flex flex-col text-[#1b1b1b] items-center px-28 pb-[250px] bg-white">
                <div className="font-extrabold text-7xl h-[86px] mt-[86px] mb-[73px]">
                    News<span className="text-[#FF7700]">.</span>
                </div>

                {/* 로딩 중/에러 후에도 뉴스 카드가 없으면 안내 메시지 */}
                {isLoading ? (
                    <div>로딩 중...</div>
                ) : error ? (
                    <div>에러 발생</div>
                ) : newsList.length === 0 ? (
                    <div className="text-xl text-gray-500">등록된 뉴스가 없습니다.</div>
                ) : (
                    <>
                        <NoticeCardList newsList={paginatedNews} />
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </>
                )}
            </div>
            <div className="w-full h-[150px] px-28">
                <QuoteCardList />
            </div>
        </PageLayout>
    );
};
