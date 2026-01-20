import type { Notice } from "@/types/notice";

import { NoticeSearchItem } from "./NoticeSearchItem";

interface NoticeSearchListProps {
    data: Notice[];
    selectedIds: number[];
    onToggleSelect: (id: number) => void;
    onToggleSelectAll?: (checked: boolean) => void;
    length: number;
}

export const NoticeSearchList = ({
    data,
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
                <div className="h-10 flex items-center text-[#666666] font-medium bg-[#FAFAFA] px-5">
                    <span className="flex items-center justify-center flex-[1] text-center">
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
                    <span className="flex-[3.5] text-left pl-9 min-w-5">No</span>
                    <span className="flex-[21.5] text-left">제목</span>
                    <span className="flex-[2.7] text-left min-w-20">등록일</span>
                </div>

                {/* 리스트 content */}
                <div>
                    {data.map((notice, index) => (
                        <NoticeSearchItem
                            key={notice.noticeId}
                            notice={notice}
                            index={index}
                            selected={selectedIds.includes(notice.noticeId)}
                            onToggleSelect={onToggleSelect}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
