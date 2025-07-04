import type { Notice } from "@/types/notice";

import { NoticeSearchItem } from "./NoticeSearchItem";
interface NoticeSearchListProps {
    data: Notice[];
    showCheckboxes: boolean;
    selectedIds: number[];
    onToggleSelect: (id: number) => void;
    onToggleSelectAll?: (checked: boolean) => void;
    length: number;
}

export const NoticeSearchList = ({
    data,
    showCheckboxes,
    selectedIds,
    onToggleSelect,
    onToggleSelectAll,
    length
}: NoticeSearchListProps) => {
    return (
        <div>
            <div className="text-sm mb-4">
                검색결과 <span className="text-orange-400">{length}</span>
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

                    <span className="flex-[0.7] text-left pl-6 pr-[6px]">No</span>
                    <span className="flex-[0.7] text-left">태그</span>
                    <span className="flex-[4] text-left">제목</span>
                    <span className="flex-[1] text-left">작성자</span>
                    <span className="flex-[1.5] text-left">등록일</span>
                </div>

                {/* 리스트 content */}
                <div>
                    {data.map((notice, index) => (
                        <NoticeSearchItem
                            key={notice.noticeId}
                            notice={notice}
                            index={index}
                            showCheckboxes={showCheckboxes}
                            selected={selectedIds.includes(notice.noticeId)}
                            onToggleSelect={onToggleSelect}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
