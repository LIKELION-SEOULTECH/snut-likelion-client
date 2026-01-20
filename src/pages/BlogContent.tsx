import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/layouts/PageLayout";

import { ParticipantTags } from "@/components/blog/ParticipantsTags";
import { PostContent } from "@/components/common/PostContent";
import { PostNavigator } from "@/components/common/PostNavigator";

import QuoteCardList from "@/components/project/QuoteCardList";
import type { BlogDetail } from "@/apis/blog";
import { getBlogById } from "@/apis/blog";

export const BlogContentPage = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<BlogDetail | null>(null); // 타입 지정 필요시 수정
    const [prevPost, setPrevPost] = useState<BlogDetail | null>(null);
    const [nextPost, setNextPost] = useState<BlogDetail | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchBlog = async () => {
            try {
                const currentId = Number(id);

                const res = await getBlogById(Number(id));

                setBlog(res.data.data);

                if (currentId > 1) {
                    try {
                        const prevRes = await getBlogById(currentId - 1);
                        setPrevPost(prevRes.data.data);
                    } catch {
                        setPrevPost(null);
                    }
                }

                try {
                    const nextRes = await getBlogById(currentId + 1);
                    setNextPost(nextRes.data.data);
                } catch {
                    setNextPost(null);
                }
            } catch (error) {
                console.error("❌ 블로그 상세 조회 실패:", error);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) return <div>404 Not Found</div>;
    const formattedDate = new Date(blog.updatedAt).toISOString().split("T")[0].replace(/-/g, ".");
    const displayCategory = blog.category === "OFFICIAL" ? "세션 이야기" : "프로젝트 회고";

    return (
        <PageLayout white={true}>
            <div className="w-full flex flex-col text-[#1b1b1b] items-center px-28 bg-white">
                <section className="pl-[103px] w-full mt-33">
                    <div className="font-bold text-2xl text-[#FFA454] leading-[150%]">
                        {displayCategory}
                    </div>
                    <div className="font-bold text-[50px] mt-5">{blog.title}</div>
                    <div className="text-xl text-[#666666] font-light leading-[150%] mt-[37px]">
                        {formattedDate}
                    </div>
                    <div className="mt-5 mb-18">
                        <ParticipantTags names={blog.taggedMemberNames} />
                    </div>
                </section>

                <div className="w-full">
                    <PostContent content={blog.contentHtml} />
                </div>
                <section className="w-full mt-30">
                    <PostNavigator
                        prev={
                            prevPost
                                ? {
                                      title: prevPost.title,
                                      href: `/blog-content/${blog.postId - 1}`
                                  }
                                : undefined
                        }
                        next={
                            nextPost
                                ? {
                                      title: nextPost.title,
                                      href: `/blog-content/${blog.postId + 1}`
                                  }
                                : undefined
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
