import type { AdminBlog } from "@/types/blog";
import { BlogSearchItem } from "./BlogSearchItem";
interface BlogSearchListProps {
    blogs: AdminBlog[];
    showCheckboxes: boolean;
    selectedIds: number[];
    totalElements: number;
    onToggleSelect: (id: number) => void;
    onToggleSelectAll?: (checked: boolean) => void;
}

export const BlogSearchList = ({
    blogs,
    showCheckboxes,
    selectedIds,
    totalElements,
    onToggleSelect,
    onToggleSelectAll
}: BlogSearchListProps) => {
    return (
        <div>
            <div className="text-sm mb-8">
                검색결과 <span className="text-orange-400">{totalElements}</span>
            </div>

            <div className="w-full text-sm rounded-sm overflow-hidden bg-white min-h-[527px]">
                {/* 리스트 헤더 */}
                <div className="h-10 flex items-center text-[#666666] font-medium bg-[#FAFAFA]">
                    {showCheckboxes && (
                        <span className="flex items-center justify-center flex-[0.3] text-center pl-4">
                            <input
                                type="checkbox"
                                className="w-4 h-4 appearance-none border border-[#BCC3CE] rounded-xs 
                                checked:bg-[#FF7700] checked:border-transparent 
                                checked:after:content-['✓'] checked:after:text-white 
                                checked:after:text-[16px] checked:after:block 
                                checked:after:text-center checked:after:leading-[1rem] 
                                flex items-center justify-center align-middle"
                                checked={blogs.length > 0 && selectedIds.length === blogs.length}
                                onChange={(e) => onToggleSelectAll?.(e.target.checked)}
                            />
                        </span>
                    )}

                    <span className="flex-[0.6] text-left pl-6 pr-[6px]">No</span>
                    <span className="flex-[1] text-left">태그</span>
                    <span className="flex-[4] text-left">제목</span>
                    <span className="flex-[1] text-left">작성자</span>
                    <span className="flex-[1.5] text-left">등록일</span>
                </div>

                {/* 리스트 content */}
                <div>
                    {blogs.map((blog, index) => (
                        <BlogSearchItem
                            key={blog.id}
                            blog={blog}
                            index={index}
                            showCheckboxes={showCheckboxes}
                            selected={selectedIds.includes(blog.id)}
                            onToggleSelect={onToggleSelect}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
