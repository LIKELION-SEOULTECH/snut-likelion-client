import type { Blog } from "@/types/blog";

interface BlogSearchListProps {
    data: Blog[];
    showCheckboxes: boolean;
    selectedIds: number[];
    onToggleSelect: (id: number) => void;
    onToggleSelectAll?: (checked: boolean) => void;
}

export const BlogSearchList = ({
    data,
    showCheckboxes,
    selectedIds,
    onToggleSelect,
    onToggleSelectAll
}: BlogSearchListProps) => {
    return (
        <div>
            <div className="text-sm mb-4">
                검색결과 <span className="text-orange-400">{data.length}</span>
            </div>

            <div className="w-full text-sm rounded-sm overflow-hidden">
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
                                checked={data.length > 0 && selectedIds.length === data.length}
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
                    {data.map((notice, index) => (
                        <div
                            key={notice.id}
                            className={`relative flex h-[66px] items-center font-medium ${
                                index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"
                            }`}
                        >
                            {showCheckboxes && (
                                <span className="flex items-center justify-center flex-[0.3] text-center pl-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(notice.id)}
                                        onChange={() => onToggleSelect(notice.id)}
                                        className="w-4 h-4 appearance-none border border-[#BCC3CE] rounded-xs 
                                        checked:bg-[#FF7700] checked:border-transparent 
                                        checked:after:content-['✓'] checked:after:text-white 
                                        checked:after:text-[16px] checked:after:block 
                                        checked:after:text-center checked:after:leading-[1rem] 
                                        flex items-center justify-center align-middle"
                                    />
                                </span>
                            )}
                            <span className="flex-[0.6] pl-[30px] text-left">{notice.id}</span>
                            <span className="flex-[1] text-left">{notice.tag}</span>
                            <span className="flex-[4] text-left">
                                <div className="flex justify-between items-center pr-14">
                                    <span>{notice.title}</span>
                                </div>
                            </span>
                            <span className="flex-[1] text-left">{notice.writer}</span>
                            <span className="flex-[1.5] text-left">{notice.createdAt}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
