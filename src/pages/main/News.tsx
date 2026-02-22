import { useState } from "react";
import PageLayout from "@/layouts/PageLayout";
import { NoticeCardList } from "@/components/notice/NoticeCardList";
import { Pagination } from "@/components/common/Pagination";
import QuoteCardList from "@/components/project/QuoteCardList";
import { useNotices } from "@/hooks/useNotice";
import { MainSearchBar } from "@/components/common/MainSearchBar";
import { NoticeSkeleton } from "@/components/notice/NoticeSkeleton";

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

    console.log(newsList);
    return (
        <PageLayout white={true}>
            <div className="w-full flex flex-col text-[#1b1b1b] items-center px-28 pb-[250px] bg-white min-w-250">
                <div className="font-extrabold text-7xl h-[86px] mt-[86px] mb-[73px]">
                    News<span className="text-[#FF7700]">.</span>
                </div>

                <div className="w-full flex justify-start">
                    <div className="min-w-[598px]">
                        <MainSearchBar />
                    </div>
                </div>

                <div className="flex flex-col mt-18 w-full items-center">
                    {isLoading ? (
                        <div className="w-full flex flex-col justify-center items-center min-h-40">
                            <NoticeSkeleton />
                        </div>
                    ) : error ? (
                        <div className="w-full flex justify-center items-center h-40 text-xl text-red-500 border-y-2 border-[#2D2D2D] min-h-147">
                            서버 연결 실패
                        </div>
                    ) : newsList.length === 0 ? (
                        <div className="w-full flex justify-center items-center h-40 text-xl text-gray-200 border-y-2 border-[#2D2D2D] min-h-147">
                            아직 작성된 소식이 없어요.
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col w-full border-t-2 border-b-1 border-[#2D2D2D]">
                                <NoticeCardList newsList={paginatedNews} />
                            </div>
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </div>
            </div>
            <div className="w-full h-[150px] px-28">
                <QuoteCardList />
            </div>
        </PageLayout>
    );
};
