import type { ApplicationData } from "@/types/recruitment";
import { RecruitUserItem } from "./RecruitUserItem";
import { useRecruitManageStore } from "@/stores/useRecruitManageStore";
import { cn } from "@/libs/cn";

export const RecruitUserSearchList = ({
    data,
    totalElements,
    selectedIds,
    onToggleSelect,
    onToggleSelectAll
}: {
    data: ApplicationData[];
    totalElements: number;
    selectedIds: number[];
    onToggleSelect: (id: number) => void;
    onToggleSelectAll: () => void;
}) => {
    const { isManageMode } = useRecruitManageStore();
    const pageIds = data.map((app) => app.id);
    const isAllChecked = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));

    return (
        <div>
            <div className="flex flex-row regular-14 mb-4 text-gray-900 gap-7">
                <div>
                    전체 <span className="text-orange-400">{totalElements}</span>
                </div>
                <div>
                    합격 <span className="text-orange-400">{data.length}</span>
                </div>
            </div>
            <div className="w-full text-sm rounded-sm overflow-hidden">
                {/* 리스트 헤더 */}
                <div
                    className={cn(
                        "grid h-10 items-center text-[#666666] font-medium bg-[#FAFAFA] px-6",
                        isManageMode
                            ? "grid-cols-[72px_86px_108px_1fr_110px_146px_82px]"
                            : "grid-cols-[60px_100px_1fr_120px_120px_100px]"
                    )}
                >
                    {isManageMode && (
                        <span className="flex items-center justify-start text-center">
                            <input
                                type="checkbox"
                                checked={isAllChecked}
                                onChange={onToggleSelectAll}
                                className="w-4 h-4 appearance-none border border-[#BCC3CE] rounded-xs 
                                checked:bg-[#FF7700] checked:border-transparent 
                                checked:after:content-['✓'] checked:after:text-white 
                                checked:after:text-[16px] checked:after:block 
                                checked:after:text-center checked:after:leading-[1rem] 
                                flex items-center justify-center align-middle"
                            />
                        </span>
                    )}

                    <span>No</span>
                    <span>이름</span>
                    <span>이메일</span>
                    <span>파트</span>
                    <span>지원날짜</span>
                    <span className="px-[9px]">결과</span>
                </div>

                {/* 리스트 content */}
                <div>
                    {data.map((app, index) => (
                        <RecruitUserItem
                            key={app.id}
                            app={app}
                            index={index}
                            checked={selectedIds.includes(app.id)}
                            onToggle={() => onToggleSelect(app.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
