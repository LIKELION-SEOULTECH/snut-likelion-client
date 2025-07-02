import { fetchMyBlogs } from "@/apis/blog";
import type { MyBlogType } from "@/types/blog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MyBlog = () => {
    const [blogs, setBlogs] = useState<MyBlogType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchMyBlogs();
                setBlogs(data);
            } catch (err) {
                console.error("블로그 불러오기 실패", err);
            }
        };
        load();
    }, []);

    return (
        <div className="flex-1 flex flex-col mt-0 text-white mb-[120px] cursor-pointer">
            {/* 구분선 */}
            <div className="w-full h-[2px] bg-[#C4C4C4]" />

            {/* 블로그들 */}
            {blogs.map((post, idx) => (
                <div
                    key={post.postId}
                    className="w-full"
                    onClick={() => {
                        navigate(`/blog-content/${post.postId}`);
                    }}
                >
                    <div className="flex justify-between items-center py-4">
                        <div className="flex gap-4">
                            <span className="text-[18px] text-[#ECECEC] w-[120px]">
                                {post.blogCategory == "OFFICIAL" ? "세션이야기" : "아기사자이야기"}
                            </span>
                            <span className="text-[18px] text-[#C4C4C4] font-medium">
                                {post.title}
                            </span>
                        </div>
                        <div className="text-[18px] text-[#C4C4C4] font-light">
                            {new Date(post.updatedAt).toLocaleDateString("ko-KR", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit"
                            })}
                        </div>
                    </div>

                    {/* 중간 1px 선 (마지막 요소 뺴고) */}
                    {idx !== blogs.length - 1 && <div className="w-full h-[1px] bg-[#C4C4C4]" />}
                </div>
            ))}

            {/* 구분선 */}
            <div className="w-full h-[2px] bg-[#C4C4C4]" />
        </div>
    );
};
