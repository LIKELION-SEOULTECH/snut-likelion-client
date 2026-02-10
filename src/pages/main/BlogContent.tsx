import { useParams } from "react-router-dom";
import PageLayout from "@/layouts/PageLayout";
import { useQuery } from "@tanstack/react-query";

import { ParticipantTags } from "@/components/blog/ParticipantsTags";
import { PostContent } from "@/components/common/PostContent";
import { PostNavigator } from "@/components/common/PostNavigator";
import { Skeleton } from "@/components/ui/skeleton";

import QuoteCardList from "@/components/project/QuoteCardList";
import type { BlogDetail } from "@/types/blog";
import { getBlogDetail } from "@/apis/main/blog";

const BlogContentSkeleton = () => (
    <PageLayout white={true}>
        <div className="w-full flex flex-col text-[#1b1b1b] items-center px-28 bg-white">
            <section className="pl-[103px] w-full mt-38 animate-pulse flex flex-col">
                {/* <Skeleton className="h-8 w-32 bg-gray-200 mb-5" /> */}
                <Skeleton className="h-12 w-3/4 mt-5 bg-gray-200 mb-[20px]" />
                <Skeleton className="h-6 w-48 mt-[37px] bg-gray-200" />
                <div className="mt-5 mb-18 flex gap-2">
                    <Skeleton className="h-8 w-20 bg-gray-200 rounded-[4px]" />
                    <Skeleton className="h-8 w-20 bg-gray-200 rounded-[4px]" />
                    <Skeleton className="h-8 w-20 bg-gray-200 rounded-[4px]" />
                </div>
            </section>

            <div className="w-full mt-10 animate-pulse">
                <div className="space-y-4 pl-[103px]">
                    <Skeleton className="h-6 w-full bg-gray-200" />
                    <Skeleton className="h-6 w-full bg-gray-200" />
                    <Skeleton className="h-6 w-5/6 bg-gray-200" />
                    <Skeleton className="h-40 w-full bg-gray-200 mt-8" />
                    <Skeleton className="h-6 w-full bg-gray-200" />
                    <Skeleton className="h-6 w-3/4 bg-gray-200" />
                </div>
            </div>
        </div>
    </PageLayout>
);

export const BlogContentPage = () => {
    const { id } = useParams<{ id: string }>();
    const currentId = id ? Number(id) : undefined;

    const { data: blog, isLoading: isBlogLoading } = useQuery<BlogDetail, Error>({
        queryKey: ["blog", currentId],
        queryFn: async () => {
            const res = await getBlogDetail(currentId!);
            return res.data.data;
        },
        enabled: !!currentId
    });

    const { data: prevPost } = useQuery<BlogDetail, Error>({
        queryKey: ["blog", currentId ? currentId - 1 : undefined],
        queryFn: async () => {
            const res = await getBlogDetail(currentId! - 1);
            return res.data.data;
        },
        enabled: !!currentId && currentId > 1,
        retry: false // Don't retry if a previous post doesn't exist
    });

    const { data: nextPost } = useQuery<BlogDetail, Error>({
        queryKey: ["blog", currentId ? currentId + 1 : undefined],
        queryFn: async () => {
            const res = await getBlogDetail(currentId! + 1);
            return res.data.data;
        },
        enabled: !!currentId,
        retry: false // Don't retry if a next post doesn't exist
    });

    if (isBlogLoading) {
        return <BlogContentSkeleton />;
    }

    if (!blog) return <div className="text-white flex justify-center mt-20">404 Not Found</div>;

    const formattedDate = new Date(blog.updatedAt).toISOString().split("T")[0].replace(/-/g, ".");
    // const displayCategory = blog.category === "OFFICIAL" ? "세션 이야기" : "아기사자 이야기";

    return (
        <PageLayout white={true}>
            <div className="w-full flex flex-col text-[#1b1b1b] items-center px-28 bg-white">
                <section className="pl-[103px] w-full mt-33">
                    {/* <div className="font-bold text-2xl text-[#FFA454] leading-[150%]">
                        {displayCategory}
                    </div> */}
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
                                      href: `/blog-content/${prevPost.postId}`
                                  }
                                : undefined
                        }
                        next={
                            nextPost
                                ? {
                                      title: nextPost.title,
                                      href: `/blog-content/${nextPost.postId}`
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
