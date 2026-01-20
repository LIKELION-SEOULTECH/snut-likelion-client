import type { Blog } from "@/types/blog";
import { BlogCardItem } from "./BlogCardItem";

interface BlogCardListProps {
    blogs: Blog[];
}

export const BlogCardList = ({ blogs }: BlogCardListProps) => {
    return (
        <div className="grid grid-cols-3 gap-4 mt-12 w-[1217px]">
            {blogs.map((blog) => (
                <BlogCardItem
                    id={blog.postId}
                    key={blog.postId}
                    imageUrl={blog.thumbnailUrl}
                    title={blog.title}
                    date={blog.updatedAt}
                />
            ))}
        </div>
    );
};
