import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "@/layouts/PageLayout";
import { PostContent } from "@/components/common/PostContent";
import { PostNavigator } from "@/components/common/PostNavigator";
import QuoteCardList from "@/components/project/QuoteCardList";
import { getNoticeById } from "@/apis/main/notice";
import { formatDate } from "@/utils/formatData";
import { Skeleton } from "@/components/ui/skeleton";

const NewsContentSkeleton = () => (
    <PageLayout white={true}>
        <div className="w-full flex flex-col text-[#1b1b1b] items-center px-28 bg-white">
            <section className="pl-[103px] w-full mt-[135px] animate-pulse">
                <Skeleton className="h-8 w-24 bg-gray-200 mb-10" />
                <Skeleton className="h-10 w-3/4 mt-5 bg-gray-200 mb-10" />
                <Skeleton className="h-6 w-1/4 mt-[55px] mb-18 bg-gray-200" />
            </section>
            <div className="w-full animate-pulse">
                <div className="space-y-4 pl-[103px]">
                    <Skeleton className="h-6 w-4/6 bg-gray-200" />
                    <Skeleton className="h-6 w-5/6 bg-gray-200" />
                    <Skeleton className="h-6 w-5/6 bg-gray-200" />
                    <Skeleton className="h-40 w-5/6 bg-gray-200 mt-8" />
                    <Skeleton className="h-6 w-5/6 bg-gray-200" />
                    <Skeleton className="h-6 w-3/4 bg-gray-200" />
                </div>
            </div>
        </div>
    </PageLayout>
);

export const NewsContentPage = () => {
    const { id } = useParams<{ id: string }>();
    const noticeId = Number(id);

    // {noticeId: 1, title: 'test1', content: 'test2', updatedAt: '2025-06-22T23:22:37.556363'} currentData.data 예시
    const {
        data: notice,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["notice", noticeId],
        queryFn: () => getNoticeById(noticeId),
        enabled: !!noticeId
    });

    // 이전 글 조회
    const { data: prevData } = useQuery({
        queryKey: ["notice", noticeId - 1],
        queryFn: () => getNoticeById(noticeId - 1),
        enabled: noticeId > 1
    });

    // 다음 글 조회
    const { data: nextData } = useQuery({
        queryKey: ["notice", noticeId + 1],
        queryFn: () => getNoticeById(noticeId + 1),
        enabled: !!noticeId
    });

    if (isLoading) return <NewsContentSkeleton />;
    if (isError || !notice) return <div>404 Not Found</div>;

    return (
        <PageLayout white={true}>
            <div className="w-full flex flex-col text-[#1b1b1b] items-center px-28 bg-white">
                <section className="pl-[103px] w-full mt-33">
                    <div
                        className={`font-bold text-2xl leading-[150%] ${
                            notice.pinned ? "text-[#FFA454]" : "text-[#A7A7A7]"
                        }`}
                    >
                        {notice.pinned ? "공지" : "일반"}
                    </div>
                    <div className="font-bold text-[50px] mt-5">{notice.title}</div>
                    <div className="flex flex-row gap-5 text-xl text-[#666666] font-light leading-[150%] mt-[37px] ">
                        <span className="text-black">작성자</span>
                        <span>{formatDate(notice.updatedAt)}</span>
                    </div>
                </section>
                <div className="w-full">
                    <PostContent content={notice.content} />
                </div>

                <section className="w-full mt-30">
                    <PostNavigator
                        prev={
                            prevData && {
                                title: prevData.title,
                                href: `/notice-content/${prevData.noticeId}`
                            }
                        }
                        next={
                            nextData && {
                                title: nextData.title,
                                href: `/notice-content/${nextData.noticeId}`
                            }
                        }
                    />
                </section>
            </div>
            <div className="w-full h-[150px] px-28  mt-[252px]">
                <QuoteCardList />
            </div>
        </PageLayout>
    );
};
