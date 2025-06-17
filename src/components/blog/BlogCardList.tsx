import { BlogCardItem } from "./BlogCardItem";

interface Blog {
    id: number;
    imageUrl: string;
    title: string;
    date: string;
}

interface BlogCardListProps {
    blogs: Blog[];
}

export const BlogCardList = ({ blogs }: BlogCardListProps) => {
    return (
        <div className="grid grid-cols-3 gap-4 mt-12 w-[1217px]">
            {blogs.map((blog) => (
                <BlogCardItem
                    key={blog.id}
                    imageUrl={blog.imageUrl}
                    title={blog.title}
                    date={blog.date}
                />
            ))}
        </div>
    );
};
