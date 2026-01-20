import { useNavigate } from "react-router-dom";
import type { AdminBlog } from "@/types/blog";

interface BlogSearchItemProps {
    blog: AdminBlog;
    index: number;
    showCheckboxes: boolean;
    selected: boolean;
    onToggleSelect: (id: number) => void;
}

export const BlogSearchItem = ({
    blog,
    index,
    showCheckboxes,
    selected,
    onToggleSelect
}: BlogSearchItemProps) => {
    const navigate = useNavigate();

    const handleRowClick = () => {
        if (showCheckboxes) return;
        navigate(`/admin/blog/edit/${blog.id}`);
    };

    const categoryText =
        blog?.category === "OFFICIAL"
            ? "세션 이야기"
            : blog?.category === "UNOFFICIAL"
              ? "아기사자 이야기"
              : "-";

    const formattedDate = blog.createdAt
        ? new Date(blog.createdAt).toISOString().split("T")[0]
        : "-";

    return (
        <div
            className={`relative flex h-[66px] items-center font-medium cursor-pointer ${
                index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"
            }`}
            onClick={handleRowClick}
        >
            {showCheckboxes && (
                <span className="flex items-center justify-center flex-[0.3] text-center pl-4">
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => onToggleSelect(blog.id)}
                        className="w-4 h-4 appearance-none border border-[#BCC3CE] rounded-xs 
              checked:bg-[#FF7700] checked:border-transparent 
              checked:after:content-['✓'] checked:after:text-white 
              checked:after:text-[16px] checked:after:block 
              checked:after:text-center checked:after:leading-[1rem] 
              flex items-center justify-center align-middle cursor-pointer"
                    />
                </span>
            )}
            <span className="flex-[0.6] pl-[30px] text-left">{blog.id}</span>
            <span className="flex-[1] text-left">{categoryText}</span>
            <span className="flex-[4] text-left">
                <div className="flex justify-between items-center pr-14">
                    <span>{blog.title}</span>
                </div>
            </span>
            <span className="flex-[1] text-left"> {blog.author ?? "-"}</span>
            <span className="flex-[1.5] text-left">{formattedDate}</span>
        </div>
    );
};
