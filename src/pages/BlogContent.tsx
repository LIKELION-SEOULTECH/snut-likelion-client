import { useParams } from "react-router-dom";
import PageLayout from "@/layouts/PageLayout";
import { ParticipantTags } from "@/components/blog/ParticipantsTags";
import { PostContent } from "@/components/common/PostContent";
import { PostNavigator } from "@/components/common/PostNavigator";
import { mockBlogList } from "@/constants/blog/mockBlogList";

export const BlogContentPage = () => {
    const { id } = useParams<{ id: string }>();
    const blog = mockBlogList.find((b) => b.id === Number(id));

    if (!blog) return <div>404 Not Found</div>;
    return (
        <PageLayout white={true}>
            <div className="w-full flex flex-col text-[#1b1b1b] items-center px-28 bg-white">
                <section className="pl-[103px] w-full mt-33">
                    <div className="font-bold text-2xl text-[#FFA454] leading-[150%]">
                        {blog.type}
                    </div>
                    <div className="font-bold text-[50px] mt-5">{blog.title}</div>
                    <div className="text-xl text-[#666666] font-light leading-[150%] mt-[37px]">
                        {blog.date}
                    </div>
                    <div className="mt-5 mb-18">
                        <ParticipantTags names={["전민경", "박진아", "이예한"]} />
                    </div>
                </section>
                <PostContent />
                <section className="w-full mt-30">
                    <PostNavigator
                        prev={
                            blog.id > 1
                                ? {
                                      title: mockBlogList[blog.id - 2]?.title,
                                      href: `/blog-content/${blog.id - 1}`
                                  }
                                : undefined
                        }
                        next={
                            blog.id < mockBlogList.length
                                ? {
                                      title: mockBlogList[blog.id]?.title,
                                      href: `/blog-content/${blog.id + 1}`
                                  }
                                : undefined
                        }
                    />
                </section>
            </div>
        </PageLayout>
    );
};
