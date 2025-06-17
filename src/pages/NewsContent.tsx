import { useParams } from "react-router-dom";
import PageLayout from "@/layouts/PageLayout";
import { PostContent } from "@/components/common/PostContent";
import { PostNavigator } from "@/components/common/PostNavigator";
import { mockNewsList } from "@/constants/news/mockNewsList";

export const NewsContentPage = () => {
    const { id } = useParams<{ id: string }>();
    const news = mockNewsList.find((b) => b.id === Number(id));

    if (!news) return <div>404 Not Found</div>;
    return (
        <PageLayout white={true}>
            <div className="w-full flex flex-col text-[#1b1b1b] items-center px-28 bg-white">
                <section className="pl-[103px] w-full mt-33">
                    <div className="font-bold text-2xl text-[#FFA454] leading-[150%]">
                        {news.type}
                    </div>
                    <div className="font-bold text-[50px] mt-5">{news.title}</div>
                    <div className="text-xl text-[#666666] font-light leading-[150%] mt-[37px] mb-18">
                        {news.date}
                    </div>
                </section>
                <PostContent />
                <section className="w-full mt-30">
                    <PostNavigator
                        prev={
                            news.id > 1
                                ? {
                                      title: mockNewsList[news.id - 2]?.title,
                                      href: `/blog-content/${news.id - 1}`
                                  }
                                : undefined
                        }
                        next={
                            news.id < mockNewsList.length
                                ? {
                                      title: mockNewsList[news.id]?.title,
                                      href: `/news-content/${news.id + 1}`
                                  }
                                : undefined
                        }
                    />
                </section>
            </div>
        </PageLayout>
    );
};
