import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "@/layouts/PageLayout";
import { PostContent } from "@/components/common/PostContent";
import { PostNavigator } from "@/components/common/PostNavigator";
import QuoteCardList from "@/components/project/QuoteCardList";
import { getNoticeById } from "@/apis/notice";
import { formatDate } from "@/utils/formatData";

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
        queryFn: () => getNoticeById(noticeId).then((res) => res.data.data),
        enabled: !!noticeId
    });

    // 이전 글 조회
    const { data: prevData } = useQuery({
        queryKey: ["notice", noticeId - 1],
        queryFn: () => getNoticeById(noticeId - 1).then((res) => res.data),
        enabled: noticeId > 1
    });

    // 다음 글 조회
    const { data: nextData } = useQuery({
        queryKey: ["notice", noticeId + 1],
        queryFn: () => getNoticeById(noticeId + 1).then((res) => res.data),
        enabled: !!noticeId
    });

    if (isLoading) return <div>Loading...</div>;
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
                    <div className="flex flex-row gap-5 text-xl text-[#666666] font-light leading-[150%] mt-[37px] mb-18">
                        <span className="text-black">작성자</span>
                        <span>{formatDate(notice.updatedAt)}</span>
                    </div>
                </section>
                <PostContent content={notice.content} />
                <section className="w-full mt-30">
                    <PostNavigator
                        prev={
                            prevData?.data && {
                                title: prevData.data.title,
                                href: `/news-content/${prevData.data.noticeId}`
                            }
                        }
                        next={
                            nextData?.data && {
                                title: nextData.data.title,
                                href: `/news-content/${nextData.data.noticeId}`
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
