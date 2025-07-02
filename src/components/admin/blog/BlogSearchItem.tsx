import { useNavigate } from "react-router-dom";
import type { AdminBlog } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminSingleBlog } from "@/apis/blog";
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
        navigate(`/admin/blog/edit/${blog.postId}`);
    };

    const { data: adminBlog } = useQuery({
        queryKey: ["blog", blog.postId],
        queryFn: () => fetchAdminSingleBlog(blog.postId!),
        enabled: !!blog.postId
    });

    const categoryText =
        adminBlog?.category === "OFFICIAL"
            ? "세션 이야기"
            : adminBlog?.category === "UNOFFICIAL"
              ? "아기사자 이야기"
              : "-";

    const formattedDate = blog.updatedAt
        ? new Date(blog.updatedAt).toISOString().split("T")[0]
        : "-";
    return (
        <div
            className={`relative flex h-[66px] items-center font-medium ${
                index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"
            }`}
        >
            {showCheckboxes && (
                <span className="flex items-center justify-center flex-[0.3] text-center pl-4">
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => onToggleSelect(blog.postId)}
                        className="w-4 h-4 appearance-none border border-[#BCC3CE] rounded-xs 
              checked:bg-[#FF7700] checked:border-transparent 
              checked:after:content-['✓'] checked:after:text-white 
              checked:after:text-[16px] checked:after:block 
              checked:after:text-center checked:after:leading-[1rem] 
              flex items-center justify-center align-middle"
                    />
                </span>
            )}
            <span className="flex-[0.6] pl-[30px] text-left">{blog.postId}</span>
            <span className="flex-[1] text-left">{categoryText}</span>
            <span className="flex-[4] text-left cursor-pointer" onClick={handleRowClick}>
                <div className="flex justify-between items-center pr-14">
                    <span>{blog.title}</span>
                </div>
            </span>
            <span className="flex-[1] text-left"> {adminBlog?.authorName ?? "-"}</span>
            <span className="flex-[1.5] text-left">{formattedDate}</span>
        </div>
    );
};
